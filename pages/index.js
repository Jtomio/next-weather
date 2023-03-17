import FamousPlaces from "@/components/FamousPlaces";
import Header from "@/components/Header";

import { SearchBox } from "@/components/SearchBox";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Consulta Clima</title>
      </Head>

      <div className="home">
        <div className="container">
          <Header />
          <SearchBox placeholder="Pesquise por sua cidade..." />
          <FamousPlaces />
        </div>
      </div>
    </div>
  );
}
