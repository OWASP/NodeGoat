FROM node:4.4

ADD package.json /package.json
RUN npm install

RUN mkdir /app
ADD ./app /app
ADD ./artifacts /artifacts
ADD ./config /config
ADD ./test /test
ADD server.js /server.js
ADD Gruntfile.js /Gruntfile.js

CMD ["bash", "-c", "node artifacts/db-reset.js && npm start"]
