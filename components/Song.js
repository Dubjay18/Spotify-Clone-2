import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { millisToMinutesAndSeconds } from "../lib/time";
import Spot from "spotify-web-api-node";
import SpotifyWebApi from "spotify-web-api-js";
import { keyy } from "../atoms/playlistAtom";
const Song = ({ order, track }) => {
  const spotifyApi = new Spot();
  const [CurrentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const key = useRecoilValue(keyy);
  spotifyApi.setAccessToken(key);
  const playSong = () => {
    setCurrentTrackId(track.track.id);

    setIsPlaying(true);
    spotifyApi.play({
      urls: track.track.uri,
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 "
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-8">
        <p className="hidden md:inline w-40">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
