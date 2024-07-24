import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import {JwtRepository} from "./jwtRepository";
import {User} from "../../domain/entity/user";

dotenv.config();


export class Jwt implements JwtRepository{

    private blacklist: string[] = [];
    private readonly secretKey: string;

    constructor() {
        this.secretKey = process.env.SECRET_JWT || ' ';
    }

    async  generateToken(user: User): Promise<any> {
        const payload = {
            email: user.credentials.email,
            role: user.role
        }
        return jwt.sign(payload, this.secretKey);
    }

    addToBlackList(token: any): void {
        this.blacklist.push(token)
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        return this.blacklist.includes(token);
    }
}