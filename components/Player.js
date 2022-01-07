import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { useCallback, useEffect, useState } from "react";
import useSonginfo from "../hooks/useSonginfo";
import { SwitchHorizontalIcon, VolumeOffIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import SpotifyWebApi from "spotify-web-api-js";
import debounce from "lodash.debounce";
import Spot from "spotify-web-api-node";
import { keyy } from "../atoms/playlistAtom";

const spotifyApi = new SpotifyWebApi();
const spotifyN = new Spot();
const Player = () => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const key = useRecoilValue(keyy);
  const songInfo = useSonginfo();
  spotifyN.setAccessToken(key);
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyN.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);
        spotifyN.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_Playing);
        });
      });
    }
  };
  const handlePlayPause = () => {
    spotifyN.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyN.pause();
        setIsPlaying(false);
      } else {
        spotifyN.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (spotifyN.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyN]);
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyN.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-20"
          type="range"
          onChange={(e) => setVolume(Number(e.target.value))}
          value={volume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
