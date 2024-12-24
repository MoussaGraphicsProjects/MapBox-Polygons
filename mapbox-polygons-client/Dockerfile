FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine AS run-stage

WORKDIR /app

COPY --from=build-stage /app/node_modules ./

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]