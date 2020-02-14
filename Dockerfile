FROM node:8.10.0
RUN apt-get update
RUN mkdir -p service-austin
RUN apt-get install -y nginx
ENV nginx_conf /etc/nginx/nginx.conf
ENV nginx_vhost /etc/nginx/sites-available/default
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]
WORKDIR /service-austin
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
EXPOSE 6379
CMD ["npm", "setupdb"]
CMD ["npm", "start"]