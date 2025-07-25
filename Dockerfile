FROM node:lts-alpine3.22

WORKDIR /api
COPY package*.json .

RUN npm ci
RUN npm install
COPY . .

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 8080

CMD ["docker-entrypoint.sh"]