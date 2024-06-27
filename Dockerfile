# Utiliza a imagem base do Node.js
FROM node:18-alpine

# Definido o diretorio de trabalho dentro do container
WORKDIR /app

# Copiado os arquivos package-lock.json e package.json para dentro do diretorio de trabalho /app
COPY package*.json ./

# Instala as dependencias do projeto 
RUN npm install

# Copia todo o código fonte do projeto para o diretorio de trabalho /app
COPY . .

# compilar o projeto
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start:dev" ]