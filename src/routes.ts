import { Router } from "express";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

// Users
routes.post("/users", usersController.create);

// Surveys
routes.get("/surveys", surveysController.index);
routes.post("/surveys", surveysController.create);

export { routes };
