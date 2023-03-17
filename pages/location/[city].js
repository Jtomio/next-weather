import Head from "next/head";
import React from "react";
import cities from "../../lib/city.list.json";
import TodaysWeather from "@/components/TodaysWeather";
import moment from "moment-timezone";
import HourlyWeather from "@/components/HourlyWeather";
import WeeklyWeather from "@/components/WeeklyWeather";
import { SearchBox } from "@/components/SearchBox";
import Link from "next/link";

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

  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  return {
    props: {
      city: city,
      timezone: data.timezone,
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

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const endTimeStamp = Math.floor(endOfDay / 1000);

  const todayData = hourlyData.filter((data) => data.dt < endTimeStamp);

  return todayData;
};

export default function City({
  city,
  currentWeather,
  dailyWeather,
  hourlyWeather,
  timezone,
}) {
  return (
    <div>
      <Head>
        <title>{city.name} clima agora</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <Link href="/" className="back-link">
            &larr; Voltar
          </Link>
          <SearchBox placeholder="Pesquise por sua cidade..." />
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
}
