FROM node:10.15 as server
RUN mkdir /usr/src/app/server
WORKDIR /usr/src/app/server
COPY package.json /usr/src/app/server/package.json
RUN npm install
COPY . /usr/src/app
CMD ["npm", "start"]