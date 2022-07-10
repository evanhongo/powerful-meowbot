FROM node:16.15.1-slim
WORKDIR /meow-bot
COPY . .
# Install chrome
RUN apt-get install -y wget
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install ./google-chrome-stable_current_amd64.deb

RUN yarn install
RUN yarn build
CMD ["yarn", "start"]