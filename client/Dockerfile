FROM node:slim

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
