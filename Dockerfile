FROM node:16
WORKDIR /home/app
COPY . .
RUN rm ./public/* -rf
RUN npm install --verbose