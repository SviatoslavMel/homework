FROM node:16-alpine

WORKDIR /index
EXPOSE 80

RUN \
  apk --no-cache upgrade && \
  apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Europe/Kiev /etc/localtime && \
  echo "Europe/Kiev" > /etc/timezone

RUN \
  apk --no-cache add git; \
  npm i -g modclean;

COPY package*.json ./

RUN npm ci

RUN \
  modclean -r && npm uninstall modclean; \
  apk del git;

COPY . .

ENTRYPOINT [ "npm", "run", "start" ]
