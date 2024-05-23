import {
  SpotifyCurrentlyPlaying,
  SpotifyProfileData,
  SpotifyQueue,
  SpotifyRecentlyPlayed,
  SpotifyTopArtists,
  SpotifyTopTracks,
} from "@/types/spotify";

const USER_PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";
const CURRENTLY_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const QUEUE_ENDPOINT = "https://api.spotify.com/v1/me/player/queue";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
const TOP_ARTISTS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50";
const TOP_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50";

export const combinedFetchSpotifyData = async (token: string) => {
  const [profileData, currentlyPlaying, queue, recentlyPlayed, topArtists, topTracks] =
    await Promise.all([
      fetchProfileData(token),
      fetchCurrentlyPlaying(token),
      fetchQueue(token),
      fetchRecentlyPlayed(token),
      fetchTopArtists(token),
      fetchTopTracks(token),
    ]);
  return { profileData, currentlyPlaying, queue, recentlyPlayed, topArtists, topTracks };
};

export const fetchProfileData = async (token: string) => {
  return fetchSpotifyData(token, USER_PROFILE_ENDPOINT) as Promise<SpotifyProfileData>;
};

export const fetchCurrentlyPlaying = async (token: string) => {
  return fetchSpotifyData(token, CURRENTLY_PLAYING_ENDPOINT) as Promise<SpotifyCurrentlyPlaying>;
};

export const fetchQueue = async (token: string) => {
  return fetchSpotifyData(token, QUEUE_ENDPOINT) as Promise<SpotifyQueue>;
};

export const fetchRecentlyPlayed = async (token: string) => {
  return fetchSpotifyData(token, RECENTLY_PLAYED_ENDPOINT) as Promise<SpotifyRecentlyPlayed>;
};

export const fetchTopArtists = async (token: string) => {
  return fetchSpotifyData(token, TOP_ARTISTS_ENDPOINT) as Promise<SpotifyTopArtists>;
};

export const fetchTopTracks = async (token: string) => {
  return fetchSpotifyData(token, TOP_TRACKS_ENDPOINT) as Promise<SpotifyTopTracks>;
};

const fetchSpotifyData = async (token: string, endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 204 || response.status >= 400) {
    return null;
  }
  return await response.json();
};
