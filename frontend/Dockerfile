#1. using the nodejs base image.
FROM node:20-alpine

#2.Making up the working dir
WORKDIR /app/frontend

#3.Copying up the package.jsons and installing the packages.
COPY package* .
RUN npm install 

#4.Moving all the files to the WORKDIR
COPY . .

#5.Exposing up the ports for backend 
EXPOSE 5173

#6.Finally running up the server script.
CMD [ "npm","run","dev" ]

