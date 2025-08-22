FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY src ./src
EXPOSE 4000
CMD ["npm", "start"]
