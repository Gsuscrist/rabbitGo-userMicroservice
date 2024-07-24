import {MySqlUserRepository} from "./repository/mysqlUserRepository";
import {BCryptService} from "../domain/service/bCryptService";
import {Jwt} from "../application/jwt/jwt";
import {SignUpUserUseCase} from "../application/usecase/signUpUserUseCase";
import {SignUpUserController} from "./controller/signUpUserController";
import {SignInUserUseCase} from "../application/usecase/signInUserUseCase";
import {SignInUserController} from "./controller/signInUserController";
import {DeleteUserUseCase} from "../application/usecase/deleteUserUseCase";
import {DeleteUserController} from "./controller/deleteUserController";
import {GetUserUseCase} from "../application/usecase/getUserUseCase";
import {GetUserController} from "./controller/getUserController";
import {UpdateUserUseCase} from "../application/usecase/updateUserUseCase";
import {UpdateUserController} from "./controller/updateUserController";
import {UpdateSubscriptionUserUseCase} from "../application/usecase/updateSubscriptionUserUseCase";
import {UpdateSubscriptionUserController} from "./controller/updateSubscriptionUserController";
import {Validator} from "./services/validator";
import {VerifyUserConsumer} from "./brocker/consumer/verifyUserConsumer";

export const database = new MySqlUserRepository()
export const encryptService = new BCryptService()
export const jwtService = new Jwt()
const validator = new Validator(database)

export const deleteUserUseCase = new DeleteUserUseCase(database)
export const deleteUserController = new DeleteUserController(deleteUserUseCase)

export const getUserUseCase = new GetUserUseCase(database)
export const getUserController = new GetUserController(getUserUseCase)

export const signUpUserUseCase = new SignUpUserUseCase(database)
export const signUpUserController = new SignUpUserController(signUpUserUseCase, encryptService,validator)

export const signInUserUseCase = new SignInUserUseCase(database)
export const signInUserController = new SignInUserController(signInUserUseCase,jwtService,validator)

export const updateUserUseCase = new UpdateUserUseCase(database)
export const updateUserController = new UpdateUserController(updateUserUseCase,encryptService)

const updateSubscriptionUserUseCase = new UpdateSubscriptionUserUseCase(database)
export const updateSubscriptionUserController = new UpdateSubscriptionUserController(updateSubscriptionUserUseCase)

export const initVerifyUserConsumer = new VerifyUserConsumer(database)