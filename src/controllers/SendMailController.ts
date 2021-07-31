import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";

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

    const surveyUser = surveysUsersRepository.create({
      user_id: checkUserExists.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    return response.status(201).json(surveyUser);
  }
}
