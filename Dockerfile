# Imagen base 
FROM node:20 


# Crear directorio de la app 
WORKDIR /app


# Copiar package.json e instalar dependencias
COPY package*.json ./ 

#Instalamos dependencias
RUN npm install 


# Copiar el resto del código 
COPY . .

# Compilar TypeScript 
RUN npm run build 


# Exponer el puerto de la API 
EXPOSE 3000 


# Comando para correr la app 
CMD ["npm", "run", "start"]
