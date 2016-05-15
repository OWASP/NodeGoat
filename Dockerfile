FROM node:4.4

#RUN npm install

RUN node artifacts/db-reset.js
