import {Request, Response} from 'express';
import {GetByIdFavoriteShuttleUseCase} from "../../application/useCase/getByIdFavoriteShuttleUseCase";

export class GetByIdFavoriteShuttleController {
    constructor(readonly useCase:GetByIdFavoriteShuttleUseCase) {
    }

    async execute(req: Request, res: Response) {
        try {
            let id = req.params.id;
            const favoriteShuttle = await this.useCase.run(id)
            if (favoriteShuttle){
                return res.status(200).send({
                    status: "success",
                    data:favoriteShuttle,
                    message:"favorite shuttle getting successfully"
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