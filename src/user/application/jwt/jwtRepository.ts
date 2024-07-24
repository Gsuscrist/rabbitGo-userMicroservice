import {User} from "../../domain/entity/user";

export interface JwtRepository{
    generateToken(user: User): Promise<any>

    addToBlackList(token: any):void

    isTokenRevoked(token: string): Promise<boolean>
}