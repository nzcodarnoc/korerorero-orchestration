FROM node:12

ENV PORT=3000
ENV IS_DEV=false
EXPOSE 3000

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --unsafe-perm
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
