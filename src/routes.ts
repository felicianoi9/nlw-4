import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveyController} from "./controllers/SurveyController";
const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

router.get("/users", userController.index);
router.post("/users", userController.create);

router.get("/surveys", surveyController.index);
router.post("/surveys", surveyController.create);

export { router };