import { useEffect, useState } from "react";
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
  // let aciveIndex = index.index;

  const apiService = new ApiService();
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [data, setData] = useState({});
  const [futureData, setFutureData] = useState({});

  useEffect(() => {
    // fetchData(aciveIndex);
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFetch = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    apiService.forcastDetails("kolkata", 3).then((res) => {
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
    <div style={{ backgroundColor: "black", margin: "1px", padding: "10px" }}>
      <div className="flex justify-content-end">
        <AutoComplete
          value={value}
          suggestions={items}
          completeMethod={search}
          onChange={(e) => setValue(e.value)}
          placeholder="Search city name"
          field="name"
        />
      </div>
      {Object.keys(data).length > 0 && (
        <div className="grid">
          <div className="sm:col-12 md:col-6">
            <div className="grid text-center mt-8">
              <div className="col-12 font-bold">
                {data.location.name} ,{data.location.region} ,
                {data.location.country}
              </div>
              <div className="col-12 font-bold">
                {" "}
                <p>Last update</p>
                <h3>{moment(data.current.last_updated).format("HH:mm")}</h3>
                <p>
                  {moment(data.current.last_updated).format("Do MMM , YYYY")}
                </p>
              </div>
            </div>
            {/* <div>
              {data.location.name} ,{data.location.region} ,
              {data.location.country}
            </div>
            <p>Last update</p>
            <h3>{moment(data.current.last_updated).format("HH:mm")}</h3>
            <p>{moment(data.current.last_updated).format("Do MMM , YYYY")}</p> */}
          </div>
          <div className="sm:col-12 md:col-6">
            <div className="grid mt-3">
              <div className="sm:col-12 md:col-4">
                <h1>{data.current.temp_c} °C</h1>
                <span>Feels like</span> : {data.current.feelslike_c}
                <div className="flex flex-column">
                  <div className="flex gap-2">
                    <FiSunrise size={40} style={{ marginTop: "25px" }} />
                    <div>
                      <p>Sunrise</p>
                      <p>{data.forecast.astro.sunrise}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <FiSunset size={40} style={{ marginTop: "25px" }} />
                    <div>
                      <p>Sunset</p>
                      <p>{data.forecast.astro.sunset}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-12 md:col-4 ">
                <div className="grid">
                  <div className="col-12 mr-4 ">
                    {" "}
                    <img
                      src={data.current.condition.icon}
                      alt=""
                      style={{ height: "150px" }}
                    />
                  </div>
                  <div
                    className="col-12 font-semibold text-center"
                    style={{ width: "150px" }}
                  >
                    {data.current.condition.text}
                  </div>
                </div>
              </div>
              <div className="sm:col-12 md:col-4 ">
                <div className="flex gap-4">
                  <div>
                    <WiHumidity size={60} />
                    <div className="ml-3">{data.current.humidity} %</div>
                    <div className="font-semibold">Humidity</div>
                  </div>
                  <div>
                    <GiWindSlap size={60} />
                    <div className="ml-3">{data.current.wind_kph} km/h</div>
                    <div className="font-semibold">Wind Speed</div>
                  </div>
                </div>
                <div className="flex gap-4 mt-5">
                  <div>
                    <VscCompass size={60} />
                    <div className="">{data.current.pressure_mb} hpa</div>
                    <div className="font-semibold">Pressure</div>
                  </div>
                  <div>
                    <FaDharmachakra size={60} />
                    <div className="ml-4">{data.current.uv}</div>
                    <div className="font-semibold ml-3">UV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:col-12 md:col-4 text-center">
            <h2>2 Days Forcast</h2>
            <div className="grid ">
              {futureData.forecast.map((item) => {
                return (
                  <>
                    <div className="col-4" style={{ marginTop: "-20px" }}>
                      <img src={item.day.condition.icon} alt="" />
                    </div>
                    <div className="col-4">{item.day.avgtemp_c} °C</div>
                    <div className="col-4">
                      {moment(item.date).format("Do MMM , YYYY")}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="sm:col-12 md:col-8 text-center">
            <ForecastCrausol forecast={data.forecast.hour} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WheatherReport;
