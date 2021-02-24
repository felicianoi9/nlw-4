import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
    async index (request:Request, response: Response){
        const surveyRepository = getCustomRepository(SurveysRepository);

        const users = await surveyRepository.find();
        return response.json(users);
    }
    async create(request: Request, response: Response){
        const { title, description } = request.body;        
        
        const surveyRepository = getCustomRepository(SurveysRepository);

        // const userAlreadyExists = await surveyRepository.findOne({
            
        // });

        // if (userAlreadyExists){
        //     return response.status(400).json({
        //         error: "User already exists."
        //     });
        // }

        const survey = surveyRepository.create({
            title, description
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

}

export { SurveyController };
