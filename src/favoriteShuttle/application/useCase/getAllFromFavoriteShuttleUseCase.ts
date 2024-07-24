import { IFavoriteShuttleRepository } from "../../domain/repository/IFavoriteShuttleRepository";
import { VerifyShuttleProducer } from "../../infrastructure/brocker/producer/verifyShuttleProducer";

export class GetAllFromFavoriteShuttleUseCase {
    constructor(readonly repository: IFavoriteShuttleRepository) {}

    async run(userId: string) {
        try {
            const favorites = await this.repository.getAllShuttleFrom(userId);
            if (favorites) {
                const shuttlesWithDetails = await Promise.all(
                    favorites.map(async (shuttle) => {
                        let routeDetails = null;
                        let retries = 3;
                        while (!routeDetails && retries > 0) {
                            try {
                                routeDetails = await VerifyShuttleProducer(shuttle.shuttleId);
                            } catch (err) {
                                retries--;
                                if (retries === 0) {
                                    throw new Error("Failed to get route details after 3 attempts");
                                }
                            }
                        }
                        return { ...shuttle, routeDetails };
                    })
                );
                return shuttlesWithDetails;
            }
            return null;
        } catch (err) {
            throw new Error("Failed during FavoriteShuttleUseCase");
        }
    }
}
