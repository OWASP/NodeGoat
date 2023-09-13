os: linux
dist: xenial
language: node_js
services:
  - docker
  - xvfb
node_js:
  - v8
  - v10
  - v12

## Missing dependency for Cypress https://github.com/cypress-io/cypress/issues/4069
addons:
  apt:
    packages:
    - libgconf-2-4

  
## Cache NPM folder and Cypress binary
## to avoid downloading Cypress again and again
cache:
  directories:
    - ~/.npm
    - ~/.cache

before_script:
  ## we use the '&' ampersand which tells
  ## travis to run this process in the background
  ## else it would block execution and hang travis
  - docker run -d -p 27017:27017 mongo:4.0
  - docker ps -a
  - NODE_ENV=test npm start -- --silent &

script:
  - npm run test:ci

