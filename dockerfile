FROM node:16.15.1-slim
WORKDIR /meow-bot
COPY . .

# Important: apt-get update
RUN apt-get update && apt-get install -y wget
# Install chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

RUN yarn install
RUN yarn build
CMD ["yarn", "start"]