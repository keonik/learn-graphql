FROM node:lts

WORKDIR /learn-graphql/api
COPY ./api ./learn-graphql/api

# add `/app/node_modules/.bin` to $PATH
ENV PATH /learn-graphql/api/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /learn-graphql/api/package.json
RUN npm install

# Our app will run on port 9000
EXPOSE 9000

# Start an apollo server at port 9000
CMD npm start
