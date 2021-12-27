import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Player from "../components/Player";

export default function Home() {
  const [ham, setHam] = useState("hidden");
  const [bug, setBug] = useState(false);
  useEffect(() => {
    if (bug === true) {
      setHam("inline-flex");
    } else {
      setHam("hidden");
    }
  }, [bug]);
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
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
