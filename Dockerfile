FROM node:16

WORKDIR /code

ENV PORT 3030

ENV MONGO_URI mongodb://host.docker.internal

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD [ "node", "server.js" ]