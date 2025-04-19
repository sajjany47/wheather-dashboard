import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import moment from "moment";
import { LuWind } from "react-icons/lu";

export default function ForecastCrausol({ forecast = [] }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(forecast);
  }, [forecast]);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 5,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 2,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-4 px-3 flex flex-column align-items-center">
        <h4 className="mb-2 text-lg">{moment(product.time).format("HH:mm")}</h4>
        <img
          src={product.condition.icon}
          alt={product.condition.text}
          className="w-6 mb-2"
          style={{ height: "60px" }}
        />
        <h4 className="mb-1 text-xl">{product.temp_c} °C</h4>
        <div className="flex flex-column align-items-center mt-2">
          <LuWind size={28} />
          <span className="text-sm mt-1">{product.wind_kph} km/h</span>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={3}
        numVisible={6}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        className="custom-carousel"
      />
    </div>
  );
}
