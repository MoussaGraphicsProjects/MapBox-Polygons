FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache build-base && npm install

COPY . .

FROM node:18-alpine 

WORKDIR /app

COPY --from=build-stage /app/node_modules ./

COPY package*.json ./

RUN npm install --only=production 

EXPOSE 3000

CMD ["npm", "start"]