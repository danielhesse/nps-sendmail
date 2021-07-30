import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../entities/Survey";

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> { }
