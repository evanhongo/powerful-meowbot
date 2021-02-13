import axios from "axios";

const getMusicVedioIds = async (songInfos) => {
  let videoIds, errMsg;
  await Promise.all(
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
  )
    .then((res) => {
      videoIds = res;
    })
    .catch((err) => {
      errMsg = err;
    });

  if (errMsg) throw Error(errMsg);
  return videoIds;
};

export default getMusicVedioIds;
