FROM node:12-alpine

ENV PORT=3001
ENV IS_DEV=false
EXPOSE 3001

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD [ "npm", "start" ]

