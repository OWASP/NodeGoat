FROM node:0.12-onbuild

RUN node artifacts/db-reset.js
