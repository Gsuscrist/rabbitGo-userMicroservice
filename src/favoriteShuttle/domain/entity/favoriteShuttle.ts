
export class FavoriteShuttle{
    constructor(
        readonly id: string,
        readonly userId:string,
        readonly shuttleId:string,
        readonly deletedAt:Date|null
    ) {
    }
}