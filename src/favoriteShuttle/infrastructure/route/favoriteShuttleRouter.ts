import express from "express";
import {
    createFavoriteShuttleController,
    deleteFavoriteShuttleController, getAllFromFavoriteShuttleController,
    getByIdFavoriteShuttleController, updateFavoriteShuttleController
} from "../dependencies";
import {authenticateMiddleware, sanitizeMiddleware} from "../../../middleware/authenticator";


export const favoriteShuttleRouter = express.Router()

favoriteShuttleRouter.post('/',authenticateMiddleware,sanitizeMiddleware,createFavoriteShuttleController.execute.bind(createFavoriteShuttleController))
favoriteShuttleRouter.delete('/:id', authenticateMiddleware,sanitizeMiddleware,deleteFavoriteShuttleController.execute.bind(deleteFavoriteShuttleController))

favoriteShuttleRouter.get('/from/:userId',authenticateMiddleware,sanitizeMiddleware,getAllFromFavoriteShuttleController.execute.bind(getAllFromFavoriteShuttleController))
favoriteShuttleRouter.get('/:id',authenticateMiddleware,sanitizeMiddleware,getByIdFavoriteShuttleController.execute.bind(getByIdFavoriteShuttleController))

favoriteShuttleRouter.put('/:id',authenticateMiddleware,sanitizeMiddleware,updateFavoriteShuttleController.execute.bind(updateFavoriteShuttleController))