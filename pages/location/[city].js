import Head from "next/head";
import React from "react";
import cities from "../../lib/city.list.json";
import TodaysWeather from "@/components/TodaysWeather";

export async function getServerSideProps(context) {
  const city = getCityId(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.APP_OPEN_KEY}&exclude=minutely&units=metric&lang=pt_br`
  );

  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // const slug = context.params.city;

  const hourlyWeather = getHourlyWeather(data.hourly);

  return {
    props: {
      city: city,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}

const getCityId = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData) => {
  const current = new Date();
  current.setHours(current.getHours(), 0, 0, 0);
  const tomorrow = new Date(current);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const currentTimeStamp = Math.floor(current.getTime() / 1000);
  const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);

  const todayData = hourlyData.filter((data) => data.dt < tomorrowTimeStamp);

  return todayData;
};

export default function City({
  city,
  currentWeather,
  dailyWeather,
  hourlyWeather,
}) {
  return (
    <div>
      <Head>
        <title>{city.name} clima agora</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <TodaysWeather city={city} weather={dailyWeather[0]} lang="pt-BR" />
        </div>
      </div>
    </div>
  );
}
