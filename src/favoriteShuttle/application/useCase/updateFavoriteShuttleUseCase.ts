import {IFavoriteShuttleRepository} from "../../domain/repository/IFavoriteShuttleRepository";
import {VerifyShuttleProducer} from "../../infrastructure/brocker/producer/verifyShuttleProducer";

export class UpdateFavoriteShuttleUseCase{
    constructor(readonly repository:IFavoriteShuttleRepository) {
    }

    async run(id:string,userId:string,shuttleId:string){
        try {
            const verifyShuttle = await VerifyShuttleProducer(shuttleId)
            if (verifyShuttle){
                return await this.repository.update(id,userId,shuttleId);
            }
            return null
        }catch(err){
            throw new Error("Failed during updateFavoriteShuttleUseCase");
        }
    }
}