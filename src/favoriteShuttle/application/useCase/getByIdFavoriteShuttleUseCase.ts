import {IFavoriteShuttleRepository} from "../../domain/repository/IFavoriteShuttleRepository";

export class GetByIdFavoriteShuttleUseCase{
    constructor(readonly repository:IFavoriteShuttleRepository) {
    }

    async run(id:string){
        try {
            return await this.repository.getById(id)
        }catch(err){
            throw new Error("failed during GetByIdFavoriteShuttleUseCase");
        }
    }
}