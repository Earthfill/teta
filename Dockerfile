FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

ENV MONGO_URI= mongodb+srv://adebisi:oBl9SyqxKGEboqYw@sendmedb.mdupyr4.mongodb.net/?retryWrites=true&w=majority \
    JWT_SECRET=vbssd79sdsdksjbsjcsdfyuwe \
    JWT_EXPIRES=2d

CMD ["npm", "run", "start:prod"]