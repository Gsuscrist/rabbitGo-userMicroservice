import {IFavoriteShuttleRepository} from "../../domain/repository/IFavoriteShuttleRepository";
import {VerifyShuttleProducer} from "../../infrastructure/brocker/producer/verifyShuttleProducer";

export class CreateFavoriteShuttleUseCase{
    constructor(readonly repository:IFavoriteShuttleRepository) {
    }

    async run(userId:string,shuttleId:string){
        try {
            const verifyShuttle = await VerifyShuttleProducer(shuttleId)
            if (!verifyShuttle){
                throw new Error("failed during CreateFavoriteShuttleUseCase");
            }
            await this.repository.create(userId,shuttleId);
        }catch(err){
            throw new Error("Failed during createFavoriteShuttleUseCase");
        }
    }
}