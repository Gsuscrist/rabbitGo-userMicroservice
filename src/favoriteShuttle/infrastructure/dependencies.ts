import {MysqlFavoriteShuttleRepository} from "./repository/mysqlFavoriteShuttleRepository";
import {CreateFavoriteShuttleUseCase} from "../application/useCase/createFavoriteShuttleUseCase";
import {CreateFavoriteShuttleController} from "./controller/createFavoriteShuttleController";
import {DeleteFavoriteShuttleUseCase} from "../application/useCase/deleteFavoriteShuttleUseCase";
import {DeleteFavoriteShuttleController} from "./controller/deleteFavoriteShuttleController";
import {GetAllFromFavoriteShuttleUseCase} from "../application/useCase/getAllFromFavoriteShuttleUseCase";
import {GetAllFromFavoriteShuttleController} from "./controller/getAllFromFavoriteShuttleController";
import {GetByIdFavoriteShuttleUseCase} from "../application/useCase/getByIdFavoriteShuttleUseCase";
import {GetByIdFavoriteShuttleController} from "./controller/getByIdFavoriteShuttleController";
import {UpdateFavoriteShuttleUseCase} from "../application/useCase/updateFavoriteShuttleUseCase";
import {UpdateFavoriteShuttleController} from "./controller/updateFavoriteShuttleController";


const database = new MysqlFavoriteShuttleRepository()

const createFavoriteShuttleUseCase = new CreateFavoriteShuttleUseCase(database)
export const createFavoriteShuttleController = new CreateFavoriteShuttleController(createFavoriteShuttleUseCase)

const deleteFavoriteShuttleUseCase = new DeleteFavoriteShuttleUseCase(database)
export const deleteFavoriteShuttleController = new DeleteFavoriteShuttleController(deleteFavoriteShuttleUseCase)

const getAllFromFavoriteShuttleUseCase = new GetAllFromFavoriteShuttleUseCase(database)
export const getAllFromFavoriteShuttleController = new GetAllFromFavoriteShuttleController(getAllFromFavoriteShuttleUseCase)

const getByIdFavoriteShuttleUseCase = new GetByIdFavoriteShuttleUseCase(database)
export const getByIdFavoriteShuttleController = new GetByIdFavoriteShuttleController(getByIdFavoriteShuttleUseCase)

const updateFavoriteShuttleUseCase = new UpdateFavoriteShuttleUseCase(database)
export const updateFavoriteShuttleController = new UpdateFavoriteShuttleController(updateFavoriteShuttleUseCase)
