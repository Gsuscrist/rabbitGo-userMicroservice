import {Request, Response} from 'express';
import {SignInUserUseCase} from "../../application/usecase/signInUserUseCase";
import {Credentials} from "../../domain/entity/credentials";
import {JwtRepository} from "../../application/jwt/jwtRepository";
import {Validator} from "../services/validator";

export class SignInUserController {
    constructor(readonly repository:SignInUserUseCase, readonly jwt:JwtRepository, readonly validate:Validator) {
    }

    async run(req: Request, res: Response){
        try {
            let{email,password} = req.body

            if ( await this.validate.validateEmail(email)){
                const credentials = new Credentials(email, password);
                const user = await this.repository.run(credentials)
                if (user) {
                    let token = await this.jwt.generateToken(user)
                    return res.status(200).json({
                        status: "Success",
                        data: {
                            token: token,
                            name: user.name,
                            lastName: user.lastname,
                            email: user.credentials.email,
                            role: user.role,
                            type: user.type
                        },
                        message: "Successfully logged in",
                    })
                }
            }else{
                res.status(401).send({
                    status: 'error',
                    data:[],
                    message: "Email format invalid"
                })
            }
            res.status(417).send({
                status:"Error",
                data:[],
                message:"Error logged in",
            })

        }catch(error){
            console.log(error)
            res.status(500).send({
                status:"Error",
                error:error,
                message:"server failure"
            })
        }
    }

}