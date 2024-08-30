const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=";

export const YOUTUBE_VIDEO_API = `${VIDEO_API}${GOOGLE_API_KEY}`;

export const YOUTUBE_API_KEY = GOOGLE_API_KEY;