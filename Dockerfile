# Step 1: Base image
FROM node:20-alpine

# Step 2: Install Redis and Supervisor
RUN apk add --no-cache redis supervisor

# Step 3: Set working directory
WORKDIR /app

# Step 4: Install dependencies
COPY package*.json ./
RUN npm install

# Step 5: Copy app source code
COPY . .

# Step 6: Build TypeScript
RUN npm run build

# Step 7: Copy supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Step 8: Expose app port
EXPOSE 4000

# Step 9: Start Redis and Node app
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
