import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  //   const [playlist, setPlaylist] = useRecoilState(playlistState);

  return (
    <div className="px-8 flex flex-col text-white">
      {playlist?.tracks.items.map((track, i) => {
        return <Song key={track.id} track={track} order={i} />;
      })}
    </div>
  );
};

export default Songs;
