import {IFavoriteShuttleRepository} from "../../domain/repository/IFavoriteShuttleRepository";

export class DeleteFavoriteShuttleUseCase{
    constructor(readonly repository:IFavoriteShuttleRepository) {
    }

    async run(id:string){
        try {
            await this.repository.delete(id);
        }catch(err){
            throw new Error("failed during FavoriteShuttleUseCase");
        }
    }
}