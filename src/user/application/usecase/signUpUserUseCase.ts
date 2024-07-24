import {IUserRepository} from "../../domain/repository/IUserRepository";
import {Credentials} from "../../domain/entity/credentials";

export class SignUpUserUseCase{
    constructor(readonly repositoy:IUserRepository) {
    }

    async run(
        name:string,
        lastName:string,
        credentials:Credentials,
        role:string,
        type:string,
    ){
        try {
            return await this.repositoy.signUp(name,lastName,credentials,role,type)
        }catch(error){
            console.log(error)
            return null
        }
    }

}