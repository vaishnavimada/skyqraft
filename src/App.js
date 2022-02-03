import { useState } from "react";
import "./App.css";
import Mapper from "./Mapper";
import Controls from "./Controls";

import "antd/dist/antd.css";

function App() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div style={{ width: "1400px", display: "flex", margin: "auto" }}>
      <div style={{ width: "75%", marginRight: "16px" }}>
        <Mapper
          markers={markers}
          setMarkers={setMarkers}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />
      </div>
      <div style={{ maxWidth: "25%" }}>
        <Controls
          markers={markers}
          setMarkers={setMarkers}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
        />
      </div>
    </div>
  );
}

export default App;
