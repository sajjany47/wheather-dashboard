import { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { ApiService } from "./Api";
import moment from "moment";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import { VscCompass } from "react-icons/vsc";
import { FaDharmachakra } from "react-icons/fa6";

const WheatherReport = (index) => {
  let aciveIndex = index.index;

  const apiService = new ApiService();
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData(aciveIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const search = (event) => {
    apiService
      .searchReason(event.query)
      .then((res) => {
        setItems(res);
      })
      .catch((error) => console.log(error));
  };

  const fetchData = (aciveIndex) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    if (aciveIndex === 0) {
      apiService
        .historyWheather("kolkata", moment(date).format("YYYY-MM-DD"))
        .then((res) => {
          setData({ ...res, forecast: res.forecast.forecastday[0] });
        })
        .catch((error) => console.log(error));
    }
    if (aciveIndex === 1 || aciveIndex === 2) {
      apiService
        .forcastDetails("kolkata", aciveIndex === 1 ? 1 : 2)
        .then((res) => {
          if (aciveIndex === 1) {
            setData({ ...res, forecast: res.forecast.forecastday[0] });
          } else {
            setData({ ...res, forecast: res.forecast.forecastday[1] });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(data);
  return (
    <>
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
          <div className="sm:col-12 md:col-4">
            <h4>
              {data.location.name} ,{data.location.region} ,
              {data.location.country}
            </h4>
            <p>Last update</p>
            <h3>{moment(data.current.last_updated).format("HH:mm")}</h3>
            <p>{moment(data.current.last_updated).format("Do MMM , YYYY")}</p>
          </div>
          <div className="sm:col-12 md:col-8">
            <div className="flex">
              <div>
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
              <div className="ml-8">
                <img
                  src={data.current.condition.icon}
                  alt=""
                  style={{ height: "150px" }}
                />
                <h3 style={{ width: "150px" }}>
                  {data.current.condition.text}
                </h3>
              </div>
              <div className="ml-5">
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
          <div className="sm:col-12 md:col-4"></div>
          <div className="sm:col-12 md:col-8"></div>
        </div>
      )}
    </>
  );
};

export default WheatherReport;
