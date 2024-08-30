import axios from 'axios';
import { YOUTUBE_API_KEY } from './contants';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const videoData = response.data.items[0];
    const channelId = videoData.snippet.channelId;

    // Fetch channel details to get subscriber count
    const channelResponse = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'statistics',
        id: channelId,
        key: YOUTUBE_API_KEY,
      },
    });

    const channelData = channelResponse.data.items[0];

    return {
      title: videoData.snippet.title,
      channelTitle: videoData.snippet.channelTitle,
      publishedAt: videoData.snippet.publishedAt,
      description: videoData.snippet.description,
      viewCount: videoData.statistics.viewCount,
      likeCount: videoData.statistics.likeCount,
      subscriberCount: channelData.statistics.subscriberCount,
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export const fetchTrendingVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 50,
        key: YOUTUBE_API_KEY,
      },
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    throw error;
  }
};
