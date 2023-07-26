#frontend
FROM node:16.16.0 as build 
COPY . .
RUN npm run install
WORKDIR /react-app
RUN cd ./frontend
COPY package*.json .
RUN npm run build

FROM nginx:1.19
COPY ./frontend/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/build /usr/share/nginx/html

# backend
RUN cd ../backend
RUN npm i
RUN npm run start