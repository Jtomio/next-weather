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
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
