FROM node:8.4.0
RUN mkdir -p /var/app

WORKDIR /var/app

COPY app/package.json /var/app
RUN npm install
COPY app /var/app

CMD npm start
