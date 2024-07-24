import {Credentials} from "../entity/credentials";
import {User} from "../entity/user";
export interface IUserRepository {
    signUp(
        name:string,
        lastname:string,
        credentials:Credentials,
        role: string,
        type: string
    ):Promise<void>;
    signIn(
        credentials:Credentials,
    ):Promise<User|null>;
    delete(id:string):Promise<void>;
    getUser(id:string):Promise<User|null>;
    update(id:string, user:User):Promise<User|null>;
    updateSubscription(id:string,type:string):Promise<void>;
    getByEmail(email:string):Promise<User|null>;
    getById(id:string):Promise<User|null>;
}