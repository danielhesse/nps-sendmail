import { Router } from "express";
import { AnswersController } from "./controllers/AnswersController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswersController();

// Users
routes.post("/users", usersController.create);

// Surveys
routes.get("/surveys", surveysController.index);
routes.post("/surveys", surveysController.create);

// SendMail
routes.post('/sendMail', sendMailController.execute);

// Answers
routes.get('/answers/:value', answersController.execute);

export { routes };
