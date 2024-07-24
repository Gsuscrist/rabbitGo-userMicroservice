import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from "uuid";
import { FavoriteShuttle } from "../../domain/entity/favoriteShuttle";
import {IFavoriteShuttleRepository} from "../../domain/repository/IFavoriteShuttleRepository";

const prisma = new PrismaClient()
export class MysqlFavoriteShuttleRepository implements IFavoriteShuttleRepository {

    async create(userId: string, shuttleId: string): Promise<void> {
        try {
            let id = uuidv4()
            await prisma.favoriteShuttle.create({
                data:{
                    id:id,
                    userId: userId,
                    shuttleId: shuttleId,
                }
            })
        }catch (e){
            console.log("error: ",e)
            throw new Error("Failed to create user");
        }
    }

    async delete(id: string): Promise<void> {
       try {
           await prisma.favoriteShuttle.update({
               where:{id:id,
                   AND:{deleted_at:null}
               },
               data:{deleted_at:new Date()}
           })
       }catch (e){
           throw new Error("Failed to delete user");
       }
    }

    async getAllShuttleFrom(userId: string): Promise<FavoriteShuttle[] | null> {
        try {
            const shuttles = await prisma.favoriteShuttle.findMany({
                where:{
                    userId: userId,
                    AND:{
                        deleted_at:null
                    }
                }
            })
            if (shuttles){
                return shuttles.map(shuttle=>{
                    return new FavoriteShuttle(shuttle.id,shuttle.userId,shuttle.shuttleId,null)
                })
            }
            return null
        }catch (e){
            return null;
        }
    }

    async getById(id: string): Promise<FavoriteShuttle | null> {
        try {
            const favoriteShuttle = await prisma.favoriteShuttle.findUnique({
                where:{id:id,
                AND:{
                    deleted_at:null
                }},
            })
            if (favoriteShuttle){
                return new FavoriteShuttle(favoriteShuttle.id,favoriteShuttle.userId,favoriteShuttle.shuttleId,null)
            }
            return null
        }catch (e){
            return null;
        }
    }

    async update(id: string, userId: string, shuttleId: string): Promise<FavoriteShuttle | null> {
        try {
            const favoriteShuttle = await prisma.favoriteShuttle.update({
                where:{
                    id:id,
                    AND:{deleted_at:null}
                },
                data:{
                    userId:userId,
                    shuttleId:shuttleId
                }
            })
            if (favoriteShuttle){
                return new FavoriteShuttle(favoriteShuttle.id,favoriteShuttle.userId,favoriteShuttle.shuttleId,null)
            }
            return null
        }catch (e){
            console.log("error: ",e)
            return null;
        }
    }

}