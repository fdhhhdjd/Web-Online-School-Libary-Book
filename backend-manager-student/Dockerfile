FROM node:14-alpine3.12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install  

COPY . . 

HEALTHCHECK --interval=60s --timeout=2s --retries=3 CMD wget localhost:5000/ -q -O - > /dev/null 2>&1 \
            && --interval=60s --timeout=2s --retries=3 CMD wget localhost:5001/ -q -O - > /dev/null 2>&1
 
