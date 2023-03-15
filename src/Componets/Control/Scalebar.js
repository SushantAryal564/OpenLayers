import React, { useEffect } from "react";
import { ScaleLine } from "ol/control";

function Scalebar({ map }) {
  useEffect(() => {
    const control = new ScaleLine({
      units: "metric",
    });
    if (!map) return;
    map.addControl(control);
  }, [map]);
}

export default Scalebar;
