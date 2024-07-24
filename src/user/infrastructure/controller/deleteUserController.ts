import {Request, Response} from 'express';
import {DeleteUserUseCase} from "../../application/usecase/deleteUserUseCase";

export class DeleteUserController{
    constructor(readonly useCase:DeleteUserUseCase) {
    }

    async run(req: Request, res: Response){
        try{
            let id = req.params.id;
            await this.useCase.run(id)
            return res.status(204).send({
                status: 'success',
                data:[],
                message: "profile deleted successfully",
            })
        }catch(error){
            res.status(500).send({
                status:"error",
                error:error
            })
        }
    }
}