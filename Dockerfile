# imagen base de node
FROM node

# Carpeta interna a Docker donse se guardara lo copiado
WORKDIR /app

# se copia el package que tiene los requisitos
COPY package*.json ./

# Una vez copiado hay que instalar las dependencias (segun package.json)
RUN npm install

# Para copiar el codigo (apartir de donde esta este archivo)
COPY . .

# puerto base
EXPOSE 8080

# comando que se ejecuta para iniciar el proyecto, debe estar en package.json
CMD ["npm", "start"]

#para subir poner el comando : docker build -t <nombreimagen> . (el punto es la ubicacion)