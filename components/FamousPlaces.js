import React from "react";
import Image from "next/image";
import Link from "next/link";

import ImgJoinville from "../public/images/joinville.png";
import ImgBetim from "../public/images/betim.png";
import ImgSatillo from "../public/images/satillo.png";
import ImgRamos from "../public/images/ramos.png";
import ImgAveiro from "../public/images/aveiro.png";

const places = [
  {
    name: "Joinville",
    image: ImgJoinville,
    url: "/location/joinville-3459712",
  },
  {
    name: "Betim",
    image: ImgBetim,
    url: "/location/betim-3470044",
  },
  {
    name: "Saltillo",
    image: ImgSatillo,
    url: "/location/saltillo-3988086",
  },
  {
    name: "Ramos",
    image: ImgRamos,
    url: "/location/ramos-arizpe-3991043",
  },
  {
    name: "Aveiro",
    image: ImgAveiro,
    url: "/location/aveiro-2742611",
  },
];

export default function FamousPlaces() {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={index} className="places__box">
              <Link href={place.url}>
                <span>{place.name}</span>
                <div>
                  <Image
                    src={place.image}
                    alt={`${place.name} image`}
                    className="places__image-wrapper"
                    width={160}
                    height={160}
                  />
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
