import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import EtherealMailService from "../services/EtherealMailService";

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { survey_id, email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const checkSurveyExists = await surveysRepository.findOne(survey_id);

    if (!checkSurveyExists) {
      return response.status(400).json({ error: "Survey does not exists!" });
    }

    const checkUserExists = await usersRepository.findOne({ email });

    if (!checkUserExists) {
      return response.status(400).json({ error: "User does not exists!" });
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ user_id: checkUserExists.id }, { value: null }],
      relations: ["user", "survey"],
    });

    const path = resolve(__dirname, "..", "templates", "emails", "nps_mail.hbs");
    const { name, id } = checkUserExists;
    const { title, description } = checkSurveyExists;

    if (surveyUserAlreadyExists) {
      await EtherealMailService.execute({
        to: { email },
        subject: title,
        variables: {
          user_id: id,
          name,
          title,
          description,
          link: process.env.URL_MAIL,
        },
        path,
      });

      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: checkUserExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);




    await EtherealMailService.execute({
      to: { email },
      subject: title,
      variables: {
        user_id: id,
        name,
        title,
        description,
        link: process.env.URL_MAIL,
      },
      path,
    });

    return response.status(201).json(surveyUser);
  }
}
