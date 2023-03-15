import React, { useEffect, useState } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import nepaljson from "../../nepal.json";

const styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "red",
      width: 4,
    }),
    fill: new Fill({
      color: "red",
    }),
  }),
};

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

const NewMap = () => {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([546000, 6868000]);

  useEffect(() => {
    const format = new GeoJSON({ featureProjection: "EPSG:3857" });
    const features = format.readFeatures(nepaljson);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features,
      }),
      style: styleFunction,
    });
    const tempMap = new OlMap({
      target: "map",
      layers: [
        // new OlLayerTile({
        //   source: new OlSourceOSM(),
        // }),
        vectorLayer,
      ],
      view: new OlView({
        center,
        zoom,
      }),
    });
    setMap(tempMap);
  }, []);
  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
};

export default NewMap;
