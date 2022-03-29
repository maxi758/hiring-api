FROM node:16-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install glob rimraf
RUN npm install -g @nestjs/cli
#RUN npm install --only=development

COPY . .

RUN npm run build

#FROM node:14.19.0-alpine3.15 as production

#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}

#WORKDIR /usr/src/app

#COPY package*.json ./

#RUN npm install --only=production

#COPY . .

#COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
