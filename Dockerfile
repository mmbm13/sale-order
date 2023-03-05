FROM node:18-alpine AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM node:18-alpine AS server
ARG NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit-dev
COPY --from=builder ./app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]

FROM node:18-alpine as development
ARG NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . ./
ADD entrypoint.sh /opt/utils/config.sh
RUN chmod +x /opt/utils/config.sh
EXPOSE 3001
ENTRYPOINT [ "/opt/utils/config.sh" ]