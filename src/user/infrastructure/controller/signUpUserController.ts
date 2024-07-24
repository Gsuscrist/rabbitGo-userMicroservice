import {Request, Response} from 'express';
import {SignUpUserUseCase} from "../../application/usecase/signUpUserUseCase";
import {Credentials} from "../../domain/entity/credentials";
import {EncryptService} from "../../domain/service/encryptService";
import {Validator} from "../services/validator";

export class SignUpUserController {
    constructor(readonly useCase:SignUpUserUseCase, readonly encrypt:EncryptService, readonly validator:Validator) {
    }

    async run(req:Request, res:Response) {
        try {
            let {name, lastname, role,type} = req.body;
            let {email, password} = req.body.credentials;
            if (await this.validator.validateEmailFull(email)){

                if (await this.validator.validatePassword(password)){
                    password = await this.encrypt.execute(password)
                    const credentials = new Credentials(email, password);
                    await this.useCase.run(name, lastname, credentials, role, type)
                    return res.status(201).json({
                        status: "Success",
                        data: [],
                        message: "Successfully registered",

                    })
                }else{
                    res.status(417).send({
                        status:"error",
                        data:[],
                        message: "password format invalid, at least: \n a number \n a capital letter \n a non-capital letter \n a number \n a special character"
                    })
                }
            }else {
                res.status(401).send({
                    status: 'error',
                    data:[],
                    message: "Email invalid or already registered"
                })
            }
        }catch(err){
            res.status(500).send({
                message:"error",
                error:err
            });
        }
    }
}