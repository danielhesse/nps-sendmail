import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { AnswersRepository } from "../repositories/AnswersRepository";

export class AnswersController {
  async handle(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const answersRepository = getCustomRepository(AnswersRepository);

    const surveyUser = await answersRepository.findOne({
      id: u as string,
    })

    if (!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }

    surveyUser.value = Number(value);

    await answersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}
