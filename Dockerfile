FROM --platform=linux/amd64 node:16

WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD [ "node", "server.js" ]