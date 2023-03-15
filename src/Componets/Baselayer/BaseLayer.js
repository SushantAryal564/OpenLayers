import { useEffect } from "react";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source.js";
import Group from "ol/layer/Group";
function BaseLayer({ map }) {
  const EsriStreetMap = new TileLayer({
    source: new OSM({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    }),
    visible: false,
    title: "StreetMap",
  });
  const EsriTerrain = new TileLayer({
    source: new OSM({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    }),
    visible: false,
    title: "Terrain",
  });
  const EsriImagery = new TileLayer({
    source: new OSM({
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    }),
    visible: true,
    title: "World Imagery",
  });
  useEffect(() => {
    if (!map) return;
    const baselayerGroup = new Group({
      layers: [EsriStreetMap, EsriTerrain, EsriImagery],
    });
    map.addLayer(baselayerGroup);
    const baseLayerElements = document.querySelectorAll(
      ".baselayer > input[type=radio]"
    );
    for (let baseLayerElement of baseLayerElements) {
      baseLayerElement.addEventListener("change", function () {
        let baseLayerElementValue = this.value;
        baselayerGroup.getLayers().forEach((element, index, array) => {
          let baselayerTitle = element.get("title");
          element.setVisible(baselayerTitle === baseLayerElementValue);
        });
      });
    }
  }, [map]);
  return (
    <div className="w-40 z-50 absolute top-0 left-10 bg-slate-100 justify-start	content-start">
      <h2>BaseLayer</h2>
      <div className="flex flex-col items-start mx-2">
        <div className="flex gap-1 baselayer">
          <input
            type="radio"
            name="baseLayerRadioButton"
            value="StreetMap"
            checked
          />
          <div> Esri StreetMap</div>
        </div>

        <div className="flex gap-1 baselayer">
          <input
            type="radio"
            name="baseLayerRadioButton"
            value="Terrain"
            checked
          />
          <div> Esri Terrain</div>
        </div>
        <div className="flex gap-1 baselayer">
          <input
            type="radio"
            name="baseLayerRadioButton"
            value="World Imagery"
            checked
          />
          <div> Imagery</div>
        </div>
      </div>
    </div>
  );
}

export default BaseLayer;
