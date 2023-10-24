FROM node:18

WORKDIR /app

COPY  . .

RUN npm install

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

CMD [ "npm", "start" ]