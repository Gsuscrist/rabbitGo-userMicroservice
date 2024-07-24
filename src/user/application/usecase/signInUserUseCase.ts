import {IUserRepository} from "../../domain/repository/IUserRepository";
import {Credentials} from "../../domain/entity/credentials";

export class SignInUserUseCase {
    constructor(readonly repository:IUserRepository) {
    }

    async run(credentials:Credentials){
        try {
            return await this.repository.signIn(credentials);
        }catch(error){
            console.log(error)
            return null
        }
    }
}