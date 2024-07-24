import {Request, Response} from 'express';
import {GetUserUseCase} from "../../application/usecase/getUserUseCase";

export class GetUserController{
    constructor(readonly useCase:GetUserUseCase) {
    }

    async run(req: Request, res: Response){
        try {
            let id = req.params.id;
            const user = await this.useCase.run(id)
            if(user){
                return res.status(200).send({
                    status: 'success',
                    data:{
                        name:user.name,
                        lastName: user.lastname,
                        email:user.credentials.email,
                        role: user.role
                    },
                    message:"Successfully obtain",
                })
            }
        }catch (e){
            res.status(500).send({
                status: 'error',
                error:e
            })
        }
    }
}