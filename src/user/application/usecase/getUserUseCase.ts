import {IUserRepository} from "../../domain/repository/IUserRepository";

export class GetUserUseCase {
    constructor(readonly repository:IUserRepository) {
    }

    async run(id:string){
        try {
            return await this.repository.getUser(id)
        }catch(err){
            console.log(err)
            return null;
        }
    }
}