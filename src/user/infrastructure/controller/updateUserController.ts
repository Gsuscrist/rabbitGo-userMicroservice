import {Request, Response} from 'express';
import {UpdateUserUseCase} from "../../application/usecase/updateUserUseCase";
import {BCryptService} from "../../domain/service/bCryptService";
import {User} from "../../domain/entity/user";
import {Credentials} from "../../domain/entity/credentials";

export class UpdateUserController {
    constructor(readonly useCase:UpdateUserUseCase,readonly encrypt:BCryptService) {
    }

    async run(req:Request, res:Response) {
        try {
            let id = req.params.id;
            let {name, lastname, role,type} = req.body;
            let {email, password} = req.body.credentials;
            password = await this.encrypt.execute(password)
            const credentials = new Credentials(email, password);
            const user = new User(id,name,lastname,credentials,role,type,null);
            await user.validate()
            const updateUser = await this.useCase.run(id,user)
            if (updateUser){
                return res.status(200).json({
                    status:"Success",
                    data:user,
                    message:"Successfully updated",
                })
            }
        }catch (e){
            res.status(500).send({
                status: 'error',
                error: e
            })
        }
    }
}