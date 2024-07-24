
import express from 'express';
import {Response,Request} from 'express';
import {Signale} from 'signale';
import {userRouter} from "./user/infrastructure/route/userRoute";
import {favoriteShuttleRouter} from "./favoriteShuttle/infrastructure/route/favoriteShuttleRouter";
import {initVerifyUserConsumer} from "./user/infrastructure/dependencies";



const app = express();
const signale = new Signale();

app.use(express.json())

app.use('/health', (req: Request, res: Response) => {
    res.status(200).send({
        status: "Success",
        data: [],
        message: "Health ok!"
    });
});
app.use('/user',userRouter)
app.use('/favoriteShuttle',favoriteShuttleRouter)

app.listen(8083,async ()=>{
    signale.success("Server on line in port: 8083")
    //initialize consumers
    try {
        await initVerifyUserConsumer.initialize()
        signale.success('VerifyUserConsumer is running');
    } catch (error) {
        signale.error('Failed to start consumers:', error);
    }
})
