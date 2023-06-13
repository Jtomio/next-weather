import Image from "next/image";
import Link from "next/link";
import React from "react";

import ImgFooter from "../public/LogoTomio.png";

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <Link href={"https://portfoliojeison.vercel.app/"} target={"_blank"}>
          <Image
            src={ImgFooter}
            alt="Logo Tomio imagem"
            width={100}
            height={50}
            className="footer__image"
          />
        </Link>
      </div>
      <div className="footer__text">
        <p>&copy 2023 | Desenvolvido para Brigada Emergência - Tupy S.A</p>
      </div>
    </div>
  );
}
