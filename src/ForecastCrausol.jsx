import { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import moment from "moment";
import { LuWind } from "react-icons/lu";

export default function ForecastCrausol(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setProducts(props.forecast);
  }, []);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <h4 className="mb-1">{moment(product.time).format("HH:mm")}</h4>
        <div className="mb-3">
          <img
            src={product.condition.icon}
            alt={product.condition.text}
            className="w-3 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.temp_c} °C</h4>
          <LuWind size={40} style={{ marginTop: 3 }} />
          <div className="">{product.wind_kph} km/h</div>

          <div className="mt-1 flex flex-wrap gap-2 justify-content-center"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={6}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
