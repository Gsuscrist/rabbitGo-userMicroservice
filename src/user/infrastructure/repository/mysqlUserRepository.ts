import {PrismaClient} from "@prisma/client";
import { Credentials } from "../../domain/entity/credentials";
import { User } from "../../domain/entity/user";
import {IUserRepository} from "../../domain/repository/IUserRepository";
import {EncryptService} from "../../domain/service/encryptService";
import {v4 as uuidv4} from 'uuid';
import {encryptService} from "../dependencies";
import {Signale} from "signale";


const prisma = new PrismaClient();
const signale = new Signale();

export class MySqlUserRepository implements IUserRepository {

    async verifyRole(role:string) {
        switch(role) {
            case "admin":
                role = "admin";
                break;
            case "user":
                role = "user";
                break;
            default:
                role="user";
                break;
        }
        return role
    }

    async verifyType(type:string) {
        switch(type) {
            case "subscribe":
                type = "subscribe";
                break;
            case "unsubscribe":
                type = "unsubscribe";
                break;
            default:
                type="unsubscribe";
                break;
        }
        return type
    }


    async signUp(name: string, lastname: string, credentials: Credentials, role: string,type:string): Promise<void> {
        let id = uuidv4()
        let verifiedRole = await this.verifyRole(role)
        let verifiedType = await this.verifyType(type)
        try {
            const newUser = await prisma.users.create({
                data:{
                    id:id,
                    name:name,
                    lastname:lastname,
                    email:credentials.email,
                    password:credentials.password,
                    type:verifiedType,
                    role:verifiedRole,
                }
            })
            signale.success("Conexión exitosa");
        }catch(err){
            console.log("error: \n",err)
        }
    }

    async signIn(credentials: Credentials): Promise<User | null> {
        try {
            const user = await prisma.users.findUnique({
                where:{
                    email:credentials.email,
                    AND:{deleted_at:null}
                }
            })
            if (user){
                if (await encryptService.compare(credentials.password, user.password)){
                    signale.success("Conexión exitosa");
                    const newUser = new User(user.id,user.name,user.lastname,credentials,user.role,user.type,null)
                    await newUser.validate()
                    return newUser
                }
            }

            return null

        }catch(err){
            console.log("error: \n",err)
            return null;
        }
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        try {
            await prisma.users.update({
                where:{id:id},
                data:{
                    deleted_at:new Date()
                }
            })
            signale.success("Conexión exitosa");
        }catch(err){
            console.log(err);
        }

    }

    async update(id: string, user: User): Promise<User | null> {
        try {
            const updatedUser = await prisma.users.update({
                where:{id:id},
                data:{
                    name:user.name,
                    lastname:user.lastname,
                    email:user.credentials.email,
                    password:user.credentials.password,
                    type:user.type,
                    role:user.role
                }
            })
            if (updatedUser){
                signale.success("Conexión exitosa");
                return user
            }
            return null
        }catch (err){
            console.log(err);
            return null;
        }
    }

    async getUser(id: string): Promise<User | null> {
        try {
            const user = await prisma.users.findUnique({
                where:{
                    id:id,
                    AND:{deleted_at:null}
                }
            })
            if (user){
                const credentials = new Credentials(user.email,user.password)
                signale.success("Conexión exitosa");
                const newUser = new User(id,user.name,user.lastname,credentials,user.role,user.type,null)
                await newUser.validate()
                return newUser
            }
            return null
        }catch(err){
            console.log(err)
            return null;
        }
    }

    async updateSubscription(id: string,type:string): Promise<void> {
        let verifiedType = await this.verifyType(type)
        try {
            await prisma.users.update({
                where:{
                    id:id,
                    AND:{
                        deleted_at:null
                    }
                },
                data:{
                    type:verifiedType
                }
            })
        }catch (e){
            console.log("error:\n",e)
            throw new Error(`Error during ${verifiedType} procedure`)
        }
    }

    async getByEmail(email:string){
        try {
            const user = await prisma.users.findUnique({
                where:{
                    email:email,
                    AND:{
                        deleted_at:null
                    }
                }
            })
            if (user){
                const newUser = new User(user.id,user.name,user.lastname,new Credentials(user.email,user.password),user.role,user.type,null)
                await newUser.validate()
                return newUser
            }
            return null
        }catch (e){
            throw new Error(`Error during ${email} procedure`)
        }
    }

    async getById(id:string){
        try {
            const user = await prisma.users.findUnique({
                where:{
                    id:id,
                    AND:{
                        deleted_at:null
                    }
                }
            })
            if (user){
                return new User(user.id,user.name,user.lastname,new Credentials(user.email,user.password),user.role,user.type,user.deleted_at)
            }
            return null
        }catch (e){
            console.log("error: \n",e)
            throw new Error(`Error during ${id} procedure`)
        }
    }



}