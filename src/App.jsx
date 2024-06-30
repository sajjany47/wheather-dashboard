import "./App.css";
import "../node_modules/primeflex/primeflex.css";
import { useState } from "react";

import { TabView, TabPanel } from "primereact/tabview";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import WheatherReport from "./WheatherReport";

function App() {
  const [selectIndex, setSelectIndex] = useState(1);

  return (
    <>
      <TabView
        activeIndex={selectIndex}
        onTabChange={(e) => {
          setSelectIndex(e.index);
        }}
      >
        <TabPanel header="Yesterday">
          {" "}
          <WheatherReport index={selectIndex} />
        </TabPanel>
        <TabPanel header="Today">
          <WheatherReport index={selectIndex} />
        </TabPanel>
        <TabPanel header="Tomorrow">
          {" "}
          <WheatherReport index={selectIndex} />
        </TabPanel>
      </TabView>
    </>
  );
}

export default App;
