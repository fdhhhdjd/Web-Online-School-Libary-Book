#!@ Author: Nguyễn Tiến Tài.
#! Description: Dockerfile Production
#!@ Created_At : 20-12-2022.
#!@ Update_At: 15-01-2023, 14-02-2023, 12-03-2023, 18-03-2023.
FROM node:14-alpine3.12 as node_media

# Create folder 
RUN \
    if [ ! -d /usr/src/app ]; then \
       mkdir -p /usr/src/app;\
    fi

# Poin come folder 
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install node_modulde
RUN npm install  

# Copy Soucre code 
COPY . . 

# Check heal container
HEALTHCHECK --interval=60s --timeout=2s --retries=3 CMD wget localhost:8000/ -q -O - > /dev/null 2>&1

