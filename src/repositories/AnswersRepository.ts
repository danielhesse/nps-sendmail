import { EntityRepository, Repository } from "typeorm";
import { Answer } from "../entities/Answer";

@EntityRepository(Answer)
export class AnswersRepository extends Repository<Answer> { }
