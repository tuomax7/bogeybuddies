# Stage 1: Build the client
FROM node:slim AS client

WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build


# Stage 2: Build the server
FROM node:slim AS server

WORKDIR /app

# Install server dependencies
COPY package*.json ./
RUN npm install

# Copy server code
COPY . .

# Copy the client build output into the server
COPY --from=client /client/dist /app/client/dist

EXPOSE 8080

CMD ["npx", "nodemon", "src/index.ts"]

