import {FavoriteShuttle} from "../entity/favoriteShuttle";

export interface IFavoriteShuttleRepository {
    create(
        userId:string,
        shuttleId: string
    ):Promise<void>;
    delete(id: string): Promise<void>;
    getAllShuttleFrom(userId: string): Promise<FavoriteShuttle[]|null>;
    getById(id: string): Promise<FavoriteShuttle|null>;
    update(id:string,userId: string, shuttleId: string): Promise<FavoriteShuttle|null>;

}