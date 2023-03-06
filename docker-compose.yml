version: "3.7"

services:
  web:
    build: .
    environment:
      NODE_ENV:
      MONGODB_URI: mongodb://mongo:27017/nodegoat
    command: sh -c "until nc -z -w 2 mongo 27017 && echo 'mongo is ready for connections' && node artifacts/db-reset.js && npm start; do sleep 2; done"
    ports:
      - "4000:4000"

  mongo:
    image: mongo:4.4
    user: mongodb
    expose:
      - 27017
