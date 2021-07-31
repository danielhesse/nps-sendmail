import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../entities/SurveyUser";

@EntityRepository(SurveyUser)
export class SurveysUsersRepository extends Repository<SurveyUser> { }
