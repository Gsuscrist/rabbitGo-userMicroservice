import {IUserRepository} from "../../domain/repository/IUserRepository";
import {User} from "../../domain/entity/user";

export class UpdateUserUseCase{
    constructor(readonly repository:IUserRepository) {
    }

    async run(
        id:string,
        user:User
    ){
        try {
            return await this.repository.update(id,user)
        }catch(err){
            console.log(err)
            return null
        }
    }
}
