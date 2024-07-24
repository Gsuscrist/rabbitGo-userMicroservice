import {IUserRepository} from "../../domain/repository/IUserRepository";

export class DeleteUserUseCase{
    constructor(readonly repository:IUserRepository) {
    }

    async run(id:string){
        try {
            await this.repository.delete(id);
        }catch(err){
            console.log(err);
            return null;
        }
    }
}