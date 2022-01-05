import { ChevronDownIcon, MenuIcon } from "@heroicons/react/outline";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyWebApi from "spotify-web-api-js";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { userState } from "../atoms/userAtom";

import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-gray-500",
];
const spotifyApi = new SpotifyWebApi();
const Center = ({ setBug, bug }) => {
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const user = useRecoilValue(userState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * 8)]);
  }, [playlistId]);
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.log("something went wrong!", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className=" flex-grow h-screen overflow-y-scroll text-white">
      <header className=" absolute top-5 right-8">
        <div onClick={() => setBug(!bug)} className="md:hidden">
          <MenuIcon className="h-10" />
        </div>
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white">
          <img
            className="rounded-full w-10 h-10"
            src={user?.images[0]?.url}
            alt=""
          />
          <h2>{user?.display_name}</h2>
          <ChevronDownIcon />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b bg-black ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
