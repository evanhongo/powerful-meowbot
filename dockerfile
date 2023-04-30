FROM node:18.16.0-slim
WORKDIR /meow-bot
COPY . .

# Install app dependencies
RUN yarn install
RUN yarn build

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /meow-bot \
  && chown -R pptruser:pptruser /home/pptruser
# Run everything after as non-privileged user.
USER pptruser


CMD ["yarn", "start"]