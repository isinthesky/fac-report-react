# Use an official Node runtime as a parent image
FROM node:22

# Set the working directory in the container
RUN mkdir -p /app/front
WORKDIR /app/front

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app/front

RUN chmod a+x /app/front/node_modules/.bin/react-scripts

RUN npm run build

# Set the environment to production
# ENV NODE_ENV production

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run the app using CMD which defines your runtime
CMD [ "npm", "start" ]

HEALTHCHECK --interval=1m30s --timeout=10s --retries=3 --start-period=40s \
  CMD curl -f http://192.168.1.250:3000 || exit 1
