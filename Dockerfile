# Stage 1: Build Angular App
FROM node:18 AS builder

WORKDIR /app

# install dependencies first for better cache‑reuse
COPY package.json package-lock.json ./
RUN npm ci

# copy the rest of your source and build
COPY . .
RUN npm run build -- --configuration production


# Stage 2: Serve via nginx
FROM nginx:alpine

# replace the default Nginx config with our custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy the built app (make sure this path matches "outputPath" in angular.json)
COPY --from=builder /app/dist/angular-conduit /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]