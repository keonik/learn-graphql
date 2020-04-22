FROM node:lts

RUN mkdir -p /learn-graphql/ui
WORKDIR /learn-graphql/ui
COPY . /learn-graphql/ui

RUN npm install

EXPOSE 3000

# Start an apollo server at port 3000
CMD npm start