FROM node:lts

RUN mkdir -p /learn-graphql/ui
WORKDIR /learn-graphql/ui
COPY . /learn-graphql/ui

RUN npm install

# Start an apollo server at port 3000
CMD npm start