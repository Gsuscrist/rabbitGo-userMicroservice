FROM node:22-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app/user_microservice

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación correrá
EXPOSE 8083

# Comando para correr la aplicación
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run build && npm start"]
