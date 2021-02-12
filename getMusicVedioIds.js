import axios from "axios";

const getMusicVedioIds = async (songInfos) => {
  const videoIds = await Promise.all(
    songInfos.map(async (info) => {
      const res = await axios.get(process.env.YOUTUBE_DATA_API_URI, {
        params: {
          key: process.env.YOUTUBE_DATA_API_KEY,
          type: "video",
          maxResults: 1,
          q: `${info.name} ${info.artist}`,
        },
      });

      const {
        data: { items },
      } = res;

      return items[0].id.videoId;
    })
  );
  return videoIds;
};

export default getMusicVedioIds;