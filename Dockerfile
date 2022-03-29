FROM node:16.14.2-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
