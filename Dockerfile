# node 
FROM node:20-alpine3.17

# set working directory
WORKDIR /app

COPY package*.json ./
# install dependencies

RUN npm ci

#  Copy 
COPY . .


# install nest js silent
RUN npm install -g @nestjs/cli --silent


# build
RUN npm run build

# expose port
EXPOSE 8283

# start
CMD [ "npm", "run", "start:prod" ]