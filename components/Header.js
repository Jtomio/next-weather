import Image from "next/image";
import React from "react";

import ImgBrigada from "../public/LogoBrigada.png";

export default function Header() {
  return (
    <div className="header">
      <Image
        src={ImgBrigada}
        alt="Logo Brigada"
        width={160}
        height={160}
        className="header__image"
      />
      <h1 className="header__text">Consulte o Clima da sua cidade</h1>
    </div>
  );
}
