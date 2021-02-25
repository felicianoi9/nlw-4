import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
    async index (request:Request, response: Response){
        const surveyRepository = getCustomRepository(SurveysRepository);

        const surveys = await surveyRepository.find();
        return response.json(surveys);
    }
    async create(request: Request, response: Response){
        const { title, description } = request.body;        
        
        const surveyRepository = getCustomRepository(SurveysRepository);

        const survey = surveyRepository.create({
            title, 
            description,
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

}

export { SurveyController };
