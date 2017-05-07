FROM node:boron

RUN mkdir /usr/src/visualization

WORKDIR /usr/src/visualization

COPY app app
COPY internals internals
COPY server server
COPY package.json yarn.lock ./

RUN yarn
RUN yarn build

EXPOSE 3000

CMD yarn start:prod
