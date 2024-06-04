FROM ubuntu:bionic

# Install Node.js and npm
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to leverage Docker layer caching
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install global packages (sequelize-cli and nodemon)
RUN npm install -g sequelize-cli nodemon

# Copy application code
COPY . .

# Make startup.sh executable
COPY ./startup.sh .
RUN chmod +x ./startup.sh

# Expose the port your app runs on
EXPOSE 5000

# Entrypoint script (if using)
ENTRYPOINT ["./startup.sh"]

# Set environment variables if needed
ENV NODE_ENV=development
