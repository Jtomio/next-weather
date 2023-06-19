import moment from "moment-timezone";
import 'moment/locale/pt-br'
import Image from "next/image";
import React from "react";

export default function WeeklyWeather({ weeklyWeather, timezone }) {
  return (
    <div className="weekly">
      <h3 className="weekly__title">
        Clima <span>na semana</span>
      </h3>

      {weeklyWeather.length > 0 &&
        weeklyWeather.map((weather, index) => {
          if (index == 0) {
            return;
          }
          return (
            <div key={weather.dt} className="weekly__card">
              <div className="weekly__inner">
                <div className="weekly__left-content">
                  <div>
                    <h3>
                      {moment.unix(weather.dt).tz(timezone).locale('pt-br').format("dddd")}
                    </h3>
                    <h4>
                      <span>{weather.temp.max.toFixed(0)}&deg;C</span>
                      <span>{weather.temp.min.toFixed(0)}&deg;C</span>
                    </h4>
                  </div>

                  <div className="weekly__sun-times">
                    <div>
                      <span>Nascer do sol</span>
                      <span>
                        {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                      </span>
                    </div>
                    <div>
                      <span>Pôr do sol</span>
                      <span>
                        {moment.unix(weather.sunset).tz(timezone).format("LT")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="weekly__right-content">
                  <div className="weekly__icon-wrapper">
                    <div>
                      <Image
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                  <h5>{weather.weather[0].description}</h5>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
