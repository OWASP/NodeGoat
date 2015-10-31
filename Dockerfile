FROM node:0.12-onbuild

ONBUILD RUN grunt db-reset:development
