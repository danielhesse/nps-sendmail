import { Router } from "express";
import { AnswersController } from "./controllers/AnswersController";
import { NPSController } from "./controllers/NPSController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswersController();
const npsController = new NPSController();

// Users
routes.post("/users", usersController.create);

// Surveys
routes.get("/surveys", surveysController.index);
routes.post("/surveys", surveysController.create);

// SendMail
routes.post('/sendMail', sendMailController.handle);

// Answers
routes.get('/answers/:value', answersController.handle);

// Nps
routes.get('/nps/:survey_id', npsController.handle);

export { routes };
