FROM node:16-alpine

RUN mkdir /build

WORKDIR /build

COPY package.json package-lock.json ./

COPY . .

RUN npm build

ENV NODE_ENV production

EXPOSE 3000

CMD npm start
