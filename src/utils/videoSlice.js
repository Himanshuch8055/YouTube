import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'AIzaSyDjZW4sy2yrbD_7-12K01OePEELkzhYT-4'; 

export const fetchVideoDetails = createAsyncThunk(
  'video/fetchVideoDetails',
  async (videoId) => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet,statistics',
        id: videoId,
        key: API_KEY,
      },
    });

    const videoData = response.data.items[0];
    const channelId = videoData.snippet.channelId;

    const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
      params: {
        part: 'snippet,statistics',
        id: channelId,
        key: API_KEY,
      },
    });

    const channelData = channelResponse.data.items[0];

    return {
      id: videoData.id,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      publishedAt: videoData.snippet.publishedAt,
      viewCount: videoData.statistics.viewCount,
      likeCount: videoData.statistics.likeCount,
      channelTitle: videoData.snippet.channelTitle,
      channelThumbnail: channelData.snippet.thumbnails.default.url,
      subscriberCount: channelData.statistics.subscriberCount,
    };
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    currentVideo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
        state.error = null;
      })
      .addCase(fetchVideoDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentVideo = null;
      });
  },
});

export const selectCurrentVideo = (state) => state.video?.currentVideo;
export const selectVideoLoading = (state) => state.video?.loading;
export const selectVideoError = (state) => state.video?.error;

export default videoSlice.reducer;
