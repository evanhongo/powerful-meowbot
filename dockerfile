FROM node:14.15.0-slim
WORKDIR /meow-bot
COPY . .
RUN yarn install
RUN npm run build
ENV DB_URI=mongodb+srv://evan:830320@cluster0.qb3yz.gcp.mongodb.net/meow-db
ENV LINEBOT_CHANNEL_ID=1555260457
ENV LINEBOT_CHANNEL_SECRET=c2dc056ee59402bcee611f1c3379fbb7
ENV LINEBOT_CHANNEL_ACCESS_TOKEN=dBACodd0OuYL3pHfBGsq5UGfXsmnEeJuB1B4quE+TRYVCXREO2KzOsZebtJrUD17Q3pW7bQC4RAgWBLqbIyU7OagLHKtPt9yEFhGaqKLZuaW6ftUaPXOl1CF8IgOtlF2ixqvnpWHi571Ls25jxHycwdB04t89/1O/w1cDnyilFU=
ENV KKBOX_URL=https://kma.kkbox.com/charts/api/v1/daily
ENV YOUTUBE_DATA_API_URI=https://www.googleapis.com/youtube/v3/search
ENV YOUTUBE_DATA_API_KEY=AIzaSyAJBHtpP3jlhrALHOOW9O0vU5LhKDAw4o0
ENV PTT_URL=https://www.pttweb.cc/hot/all/today
ENV YAHOO_NEWS_URL=https://tw.news.yahoo.com
ENV DQ_URL=https://dq.yam.com
CMD ["npm", "test"]