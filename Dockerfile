FROM node:16-alpine

RUN mkdir /build

WORKDIR /build

COPY package.json package-lock.json ./

RUN npm run install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD npm start
