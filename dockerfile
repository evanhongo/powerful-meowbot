FROM node:16.15.1-slim
WORKDIR /meow-bot
COPY . .
RUN yarn install
RUN npm run build
CMD ["npm", "start"]