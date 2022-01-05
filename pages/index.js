import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

import Player from "../components/Player";

import { getTokenFromUrl } from "./../lib/spotify";
import { useRecoilState } from "recoil";
import { keyy, listState } from "../atoms/playlistAtom";
import SpotifyWebApi from "spotify-web-api-js";
import Spot from "spotify-web-api-node";
import Login from "./Login";
import { userState } from "../atoms/userAtom";
getTokenFromUrl;
const spotify = new SpotifyWebApi();
const spotifyN = new Spot();
export default function Home() {
  const [ham, setHam] = useState("hidden");
  const [bug, setBug] = useState(false);
  const [key, setKey] = useRecoilState(keyy);
  const [user, setUser] = useRecoilState(userState);
  const [list, setList] = useRecoilState(listState);
  useEffect(() => {
    if (bug === true) {
      setHam("inline-flex");
    } else {
      setHam("hidden");
    }
  }, [bug]);
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;
    if (_token) {
      setKey(_token);
      spotify.setAccessToken(_token);
      spotifyN.setAccessToken(_token);
      spotify.getMe().then((usern) => {
        setUser(usern);
      });
      spotify.getUserPlaylists().then((lists) => {
        console.log(lists);
        setList(lists);
      });
    }
  }, []);
  if (key) {
    return (
      <div className="bg-black h-screen overflow-hidden">
        <Head>
          <title>Spotify</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex">
          <Sidebar ham={ham} setHam={setHam} bug={bug} setBug={setBug} />
          <Center bug={bug} setBug={setBug} />
        </main>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
}
