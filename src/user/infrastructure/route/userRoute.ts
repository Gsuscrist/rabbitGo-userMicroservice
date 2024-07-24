import express from 'express';
import {
    deleteUserController,
    getUserController,
    signInUserController,
    signUpUserController, updateSubscriptionUserController,
    updateUserController
} from "../dependencies";
import {authenticateMiddleware, authorizeRole, sanitizeMiddleware} from "../../../middleware/authenticator";


export const userRouter = express.Router();

userRouter.post('/sign-up',signUpUserController.run.bind(signUpUserController));
userRouter.post('/sign-in',signInUserController.run.bind(signInUserController));
userRouter.get('/:id',authenticateMiddleware,sanitizeMiddleware,getUserController.run.bind(getUserController));
userRouter.put('/:id',authenticateMiddleware,sanitizeMiddleware,updateUserController.run.bind(updateUserController));
userRouter.delete('/:id',authenticateMiddleware,sanitizeMiddleware,deleteUserController.run.bind(deleteUserController));
userRouter.patch("/subscription/:id",authenticateMiddleware,sanitizeMiddleware,authorizeRole("admin"),updateSubscriptionUserController.execute.bind(updateSubscriptionUserController))