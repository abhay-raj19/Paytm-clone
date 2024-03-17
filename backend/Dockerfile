#1. using the nodejs base image.
FROM node:16-alpine

#2.Making up the working dir
WORKDIR /app/backend

#3.Copying up the package.jsons and installing the packages.
COPY package* .
RUN npm install 

#4.Moving all the files to the WORKDIR
COPY . .

#5.Exposing up the ports for backend 
EXPOSE 3000

#6.Finally running up the server script.
CMD [ "npm","run","dev" ]

