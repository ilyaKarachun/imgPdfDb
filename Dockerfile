FROM node:19.7

WORKDIR /app

COPY package*.json ./

RUN npm i -s

COPY . .

RUN npm install -g ts-node

ENV PORT=2000

EXPOSE 2000

CMD ["ts-node", "./app/index.ts"]
