FROM node:16-alpine

WORKDIR /app

COPY /backend/package* .

RUN npm install

COPY ./backend .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
