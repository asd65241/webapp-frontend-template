# build environment
FROM node:18-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN yarn
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine

# Copy Config
COPY --from=build /app/nginx/config.conf /etc/nginx/conf.d/default.conf

# Copy Production File
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]