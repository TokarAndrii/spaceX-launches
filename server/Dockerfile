FROM node:10.15 as server
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . .
EXPOSE 3003
CMD ["npm", "start"]