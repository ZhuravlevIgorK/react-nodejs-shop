#frontend
FROM node:16.16.0 as build 
WORKDIR /react-app
COPY . .
RUN npm run install

COPY ./frontend/package*.json .
RUN npm run build --prefix /react-app/frontend

FROM nginx:1.19
COPY ./frontend/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/frontend/build /usr/share/nginx/html

# backend
RUN npm run start --prefix ./react-app/backend