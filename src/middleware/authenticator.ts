import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import xss from "xss";
import { escape as escapeJS } from "validator";
import { createClient } from "redis";

dotenv.config();

const secretKey: string | undefined = process.env.SECRET_JWT;
if (!secretKey) {
    throw new Error("SECRET_JWT no está definido en el archivo .env");
}

// Configuración de Redis
const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect().catch(console.error);

// Middleware de autenticación con bloqueo de acceso por múltiples intentos fallidos
export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization');
    const ip = req.ip || 'unknown_ip';
    const currentTime = Date.now();

    if (!token) {
        res.status(401).json({
            error: "Unauthorized"
        });
        return;
    }

    try {
        const record = await redisClient.get(ip);
        const data = record ? JSON.parse(record) : { attempts: 0, time: currentTime };

        if (data.attempts >= 5 && currentTime - data.time < 60 * 60 * 1000) {
            res.status(429).send('Demasiados intentos fallidos. Intenta de nuevo en una hora.');
            return;
        }

        try {
            const decode = jwt.verify(token, secretKey);
            (req as any).token = decode;
            next();
        } catch (e) {
            // Incrementar contador de intentos fallidos en caso de error de verificación de token
            data.attempts += 1;
            data.time = currentTime;
            await redisClient.set(ip, JSON.stringify(data), {
                EX: 60 * 60,
            });

            console.log(e);
            res.status(401).json({
                message: "Unauthorized",
                error: e
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server Error",
            error: e
        });
    }
};


export const authorizeRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).token;

        if (user && user.role === requiredRole) {
            next();
        } else {
            res.status(404).json({
                message: "resource not exist",
            });
        }
    };
};

// Middleware para prevenir HTML escaping y JavaScript escaping
export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const sanitizeObject = (obj: any) => {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = xss(escapeJS(obj[key]));
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]);
            }
        }
    };

    // Sanitize req.body, req.query, and req.params
    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);

    next();
};