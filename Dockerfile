FROM node:21

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm update

RUN npx prisma migrate dev --name init

COPY . .

RUN npm run build

ENTRYPOINT ["/bin/sh", "-c", "npm run start:dev"]