import {Credentials} from "./credentials";
import {ValidatableEntity} from "../validation/validatableEntity";

export class User implements ValidatableEntity{
    constructor(
        readonly id:string,
        readonly name:string,
        readonly lastname:string,
        readonly credentials:Credentials,
        readonly role:string,
        readonly type: string,
        readonly deletedAt:Date | null
    ) {
    }
    async validate() {
        return Promise.resolve();
    }
}