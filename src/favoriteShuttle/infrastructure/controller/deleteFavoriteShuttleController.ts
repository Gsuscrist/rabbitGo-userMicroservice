import {Request, Response} from 'express';
import {DeleteFavoriteShuttleUseCase} from "../../application/useCase/deleteFavoriteShuttleUseCase";

export class DeleteFavoriteShuttleController {
    constructor(readonly useCase:DeleteFavoriteShuttleUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let id = req.params.id;
            await this.useCase.run(id)
            res.status(204).send({
                status: "success",
                data:[],
                message:"Shuttle removed successfully"
            })
        }catch (e){
            res.status(500).send({
                status:"error",
                error: e
            })
        }
    }
}