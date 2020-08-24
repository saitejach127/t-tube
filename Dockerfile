FROM mhart/alpine-node:latest
WORKDIR /app/src
COPY . .
EXPOSE 5000
CMD ["npm", "start"]