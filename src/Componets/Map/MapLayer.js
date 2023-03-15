import React, { useRef, useState, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as vectorLayer } from "ol/layer";
import GeoJSONLoader from "./GeoJSONLoader";
import { useGeographic } from "ol/proj";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import nepaljson from "../../nepal.json";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Marker from "../Marker/Marker";
import Scalebar from "../Control/Scalebar";
import DrawFeature from "../Control/DrawFeature";
import FullScreenControl from "../Control/FullScreenControl";
import Popup from "../PopUp/Popup";
import BaseLayer from "../Baselayer/BaseLayer";
function MapLayer() {
  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [center, setCenter] = useState([546000, 6868000]);
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
  useEffect(() => {
    const tempMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        maxZoom: 14,
        minZoom: 4,
        center,
        zoom,
      }),
    });
    setMap(tempMap);
  }, []);
  return (
    <div id="map" style={{ width: "100vw", height: "100vh" }}>
      <Marker map={map} />
      <GeoJSONLoader map={map} />
      <Scalebar map={map} />
      <DrawFeature map={map} />
      <FullScreenControl map={map} />
      <Popup map={map} />
      <BaseLayer map={map} />
    </div>
  );
}

export default MapLayer;
