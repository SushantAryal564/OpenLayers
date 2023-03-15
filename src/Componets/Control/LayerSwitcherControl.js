import React, { useEffect } from "react";

function LayerSwitcherControl({ map }) {
  useEffect(() => {
    if (!map) return;
  }, []);
  return (
    <div className="grid grid-cols-2 absolute top-0">
      <div className="col-span-1">
        <h2 className="text-red-700">BaseLayer</h2>
        <input type="radio" name="baseLayerRadioButton" value="" />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default LayerSwitcherControl;
