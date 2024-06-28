# Utilizar uma imagem base de Node.js
FROM node:18-alpine

# O diretorio de trabalho dentro do conteiner
WORKDIR /app

# Copia os arquivos package-lock.json e package.json para o diretorio /app
COPY package*.json ./

# Instala as depencias do projeto
RUN npm install

# Copiar todo o código para o /app
COPY . .

# Compila o projeto
RUN npm run build

# Expor a porta que a aplicação irá  rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start:dev"]