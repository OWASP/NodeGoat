FROM node:4.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app/

# Neither of the following work, because the mongo container isn't yet running.
#RUN node artifacts/db-reset.js
#ONBUILD RUN node artifacts/db-reset.js
