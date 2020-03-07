# base image
FROM node:10.19.0

# set the working directory to /app
WORKDIR /api

# copy package.json into the container at /app
COPY package*.json /api/

# install dependencies
RUN npm install 

# copy the current directory contents into the container at /api
COPY . /api/

# make port 3000 available to the world outside this container
EXPOSE 3000

# run the app when the container lunches
CMD ["npm", "start"]


