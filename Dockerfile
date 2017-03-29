FROM node:6.9.5

WORKDIR /var/www

COPY . .

RUN npm install -g @angular/cli && npm install
