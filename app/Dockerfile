# base image
FROM node:10.19.0

# set the working directory to /app
WORKDIR /app

# copy package.json into the container at /app
COPY package*.json /app/

# install dependencies
RUN npm install 

# copy the current directory contents into the container at /app
COPY . /app/

# make port 3001 available to the world outside this container
EXPOSE 3001

# run the app when the container lunches
CMD ["npm", "start"]


