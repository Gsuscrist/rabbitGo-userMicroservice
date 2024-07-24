import {Request, Response} from 'express';
import {GetAllFromFavoriteShuttleUseCase} from "../../application/useCase/getAllFromFavoriteShuttleUseCase";


export class GetAllFromFavoriteShuttleController {
    constructor(readonly useCase:GetAllFromFavoriteShuttleUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let userId = req.params.userId;
            const favoriteShuttle = await this.useCase.run(userId)
            if (favoriteShuttle){
                return res.status(200).send({
                    status: "success",
                    data:favoriteShuttle,
                    message:"favorite shuttle list getting successfully"
                })
            }
            return res.status(417).send({
                status: "error",
                data:[],
                message:"favorite shuttle getting failed"
            })
        }catch (e){
            res.status(500).send({
                status:"error",
                error: e
            })
        }
    }
}