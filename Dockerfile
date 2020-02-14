FROM node:8.10.0
RUN mkdir -p service-austin
WORKDIR /service-austin
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
EXPOSE 6379
CMD ["npm", "setupdb"]
CMD ["npm", "start"]