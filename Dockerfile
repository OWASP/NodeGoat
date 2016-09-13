FROM node:4.4

ENV user nodegoat_docker
ENV workdir /usr/src/app/

# Home is required for npm install. System account with no ability to login to shell
RUN useradd --create-home --system --shell /bin/false $user

RUN mkdir -p $workdir
WORKDIR $workdir
COPY package.json $workdir

# chown is required by npm install.
RUN chown $user --recursive $workdir
# Then all further actions including running the containers should be done under non-root user.
USER $user

RUN npm install
COPY . $workdir

# Neither of the following work, because the mongo container isn't yet running.
#RUN node artifacts/db-reset.js
#ONBUILD RUN node artifacts/db-reset.js
