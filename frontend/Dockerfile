FROM node:10.15 as build
RUN mkdir /usr/src/app/client
WORKDIR /usr/src/app/client
ENV PATH /usr/src/app/client/node_modules/.bin:$PATH
COPY package.json /usr/src/app/client/package.json
RUN npm install
RUN npm install react-scripts -g --silent
RUN npm run build
ADD /usr/src/app/client/build /usr/src/app/build
