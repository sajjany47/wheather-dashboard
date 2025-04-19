import { Fragment, useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { ApiService } from "./Api";
import moment from "moment";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import { VscCompass } from "react-icons/vsc";
import { FaDharmachakra } from "react-icons/fa6";
import ForecastCrausol from "./ForecastCrausol";

const WheatherReport = () => {
  const apiService = new ApiService();
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [data, setData] = useState({});
  const [futureData, setFutureData] = useState({});

  useEffect(() => {
    dataFetch();
  }, [value]);

  const dataFetch = () => {
    apiService
      .forcastDetails(
        value !== "" || Object.keys(value).length > 0 ? value.name : "kolkata",
        3
      )
      .then((res) => {
        const findTodayData = res.forecast.forecastday.find(
          (item) => item.date === moment(new Date()).format("YYYY-MM-DD")
        );
        const filterData = res.forecast.forecastday.filter(
          (item) => item.date !== moment(new Date()).format("YYYY-MM-DD")
        );

        setData({ ...res, forecast: findTodayData });
        setFutureData({ ...res, forecast: filterData });
      });
  };

  const search = (event) => {
    apiService
      .searchReason(event.query)
      .then((res) => {
        setItems(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-3">
      <div className="flex justify-content-end mb-3">
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          placeholder="Search city name"
          field="name"
          // className="w-full sm:w-30rem"
        />
      </div>

      {Object.keys(data).length > 0 && (
        <div className="grid gap-3">
          {/* Main Location + Time Info */}
          <div className="col-12 md:col-12 bg-card p-4 border-round shadow-2">
            <div className="text-center mb-3">
              <h2 className="mb-1">
                {data.location.name}, {data.location.region},{" "}
                {data.location.country}
              </h2>
              <p className="text-muted">Last update</p>
              <h3 className="my-0">
                {moment(data.current.last_updated).format("HH:mm")}
              </h3>
              <small className="text-muted">
                {moment(data.current.last_updated).format("Do MMM, YYYY")}
              </small>
            </div>
          </div>

          {/* Temperature & Weather Icons */}
          <div className="col-12 md:col-7 bg-card p-4 border-round shadow-2">
            <div className="grid">
              <div className="col-12 md:col-4">
                <h1 className="mb-2">{data.current.temp_c} °C</h1>
                <p className="text-muted">
                  Feels like: {data.current.feelslike_c} °C
                </p>
                <div className="flex align-items-center gap-2 mt-4">
                  <FiSunrise size={30} />
                  <div>
                    <p className="my-0">Sunrise</p>
                    <small>{data.forecast.astro.sunrise}</small>
                  </div>
                </div>
                <div className="flex align-items-center gap-2 mt-2">
                  <FiSunset size={30} />
                  <div>
                    <p className="my-0">Sunset</p>
                    <small>{data.forecast.astro.sunset}</small>
                  </div>
                </div>
              </div>
              <div className="col-12 md:col-4 text-center">
                <img
                  src={data.current.condition.icon}
                  alt="weather-icon"
                  className="w-6rem mb-2"
                />
                <div className="text-lg font-semibold">
                  {data.current.condition.text}
                </div>
              </div>
              <div className="col-12 md:col-4">
                <div className="flex gap-3">
                  <div className="text-center">
                    <WiHumidity size={40} />
                    <div>{data.current.humidity} %</div>
                    <small className="text-muted">Humidity</small>
                  </div>
                  <div className="text-center">
                    <GiWindSlap size={40} />
                    <div>{data.current.wind_kph} km/h</div>
                    <small className="text-muted">Wind Speed</small>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="text-center">
                    <VscCompass size={40} />
                    <div>{data.current.pressure_mb} hPa</div>
                    <small className="text-muted">Pressure</small>
                  </div>
                  <div className="text-center">
                    <FaDharmachakra size={40} />
                    <div>{data.current.uv}</div>
                    <small className="text-muted">UV Index</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 Days Forecast */}
          <div className="col-12 md:col-4 bg-card p-4 border-round shadow-2">
            <h3 className="mb-3">2-Day Forecast</h3>
            <div className="grid">
              {futureData.forecast.map((item, index) => (
                <Fragment key={index}>
                  <div className="col-4">
                    <img src={item.day.condition.icon} alt="" />
                  </div>
                  <div className="col-4">{item.day.avgtemp_c} °C</div>
                  <div className="col-4">
                    {moment(item.date).format("Do MMM, YYYY")}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          {/* Hourly Forecast Carousel */}
          <div className="col-12 md:col-12 bg-card p-4 border-round shadow-2">
            <ForecastCrausol forecast={data.forecast.hour} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WheatherReport;
