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

#Comando :
# Para crear:            docker build -t <nombreimagen> .
# Para ver:              docker images
# Para correr la iamgen: docker run -p 8080:8080 <nombre imagen>
#                   puerto web (instancia) : puerto imagen (pueden ser distintos)
#                   un puerto imagen 8080 puede tener muchos puertos web asociados (pero distintos y unicos)
