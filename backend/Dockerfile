# Build Stage
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM golang:1.16
WORKDIR /go/src/app
COPY --from=build /app/build /go/src/app
CMD ["./your-golang-binary"]