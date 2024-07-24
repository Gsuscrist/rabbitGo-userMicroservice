import {Request, Response} from 'express';
import {UpdateSubscriptionUserUseCase} from "../../application/usecase/updateSubscriptionUserUseCase";

export class UpdateSubscriptionUserController {
    constructor(readonly useCase :UpdateSubscriptionUserUseCase) {
    }

    async execute(req: Request, res: Response){
        try {
            let id = req.params.id;
            let {type} = req.body
            await this.useCase.run(id,type)
            return res.status(200).send({
                status: 'success',
                data:[],
                message:"successfully change subscription",
            })
        }catch(err){
            console.log("error:\n",err)
            return res.status(500).send({
                status: 'error',
                error: err
            })
        }
    }
}