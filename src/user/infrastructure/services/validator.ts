import {IUserRepository} from "../../domain/repository/IUserRepository";

export class Validator {
    constructor(readonly repository:IUserRepository) {
    }

     async validateEmailFull(email: string) {
        if (await this.validateEmail(email)) {
            const user = await this.repository.getByEmail(email)
            if (!user) {
                return true;
            }
        }
        return false;
    }
    async validateEmail(email: string) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    async validatePassword(password: string) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;
        return regex.test(password);
    }




}

