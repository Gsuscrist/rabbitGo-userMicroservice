import {Request, Response} from 'express';
import {UpdateFavoriteShuttleUseCase} from "../../application/useCase/updateFavoriteShuttleUseCase";

export class UpdateFavoriteShuttleController {
    constructor(readonly useCase:UpdateFavoriteShuttleUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let id = req.params.id;
            let{userId, shuttleId} = req.body;
            const favoriteShuttle = await this.useCase.run(id,userId,shuttleId)
            if (favoriteShuttle){
                return res.status(200).send({
                    status: "success",
                    data:favoriteShuttle,
                    message:"favorite shuttle update successfully"
                })
            }
            return res.status(417).send({
                status: "error",
                data:[],
                message:"favorite shuttle update failed"
            })
        }catch (e){
            res.status(500).send({
                status:"error",
                error: e
            })
        }
    }
}