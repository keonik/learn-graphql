FROM node:lts

RUN mkdir -p /usr/src/apollo-api
WORKDIR /usr/src/apollo-api
COPY . /usr/src/apollo-api

RUN npm install

# Our app will run on port 9000
EXPOSE 9000

# Start an apollo server at port 9000
CMD [ "npm", "run", "start" ]
