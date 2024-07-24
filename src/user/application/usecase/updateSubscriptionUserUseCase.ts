import {IUserRepository} from "../../domain/repository/IUserRepository";

export class UpdateSubscriptionUserUseCase{
    constructor(readonly repository:IUserRepository) {
    }

    async run(
        id:string,
        type:string,
    ){
        try {
            await this.repository.updateSubscription(id,type)
        }catch(err){
            console.log(err)
            throw new Error("error during update SubscriptionUserUseCase")
        }
    }
}
