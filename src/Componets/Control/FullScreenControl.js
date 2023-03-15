import React, { useEffect } from "react";
import { FullScreen } from "ol/control";
function FullScreenControl({ map }) {
  useEffect(() => {
    if (!map) return;
    const fullScreenControl = new FullScreen();
    map.addControl(fullScreenControl);
  }, [map]);
}

export default FullScreenControl;
