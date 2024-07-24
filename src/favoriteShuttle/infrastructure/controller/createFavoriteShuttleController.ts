import {Request, Response} from 'express';
import {CreateFavoriteShuttleUseCase} from "../../application/useCase/createFavoriteShuttleUseCase";

export class CreateFavoriteShuttleController {
    constructor(readonly useCase:CreateFavoriteShuttleUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let{userId, shuttleId} = req.body;
            await this.useCase.run(userId,shuttleId)
            res.status(210).send({
                status: "success",
                data:[],
                message:"Shuttle added successfully"
            })
        }catch (e){
            res.status(500).send({
                status:"error",
                error: e
            })
        }
    }
}