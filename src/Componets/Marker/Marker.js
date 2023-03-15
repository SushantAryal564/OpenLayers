import React, { useEffect } from "react";
import VectorSource from "ol/source/Vector";
import { Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import cityjson from "./../testdata/city.json";
import { Style, Icon } from "ol/style";
import image from "./../icon/marker.png";
function Marker({ map }) {
  useEffect(() => {
    if (!map) return;
    const format = new GeoJSON({ featureProjection: "EPSG:3857" });
    const features = format.readFeatures(cityjson);
    var vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10,
    });
    var markerStyle = new Style({
      image: new Icon({
        src: image,
        scale: 0.05,
      }),
    });
    vectorSource.getFeatures().forEach(function (feature) {
      feature.setStyle(markerStyle);
    });
    map.addLayer(vectorLayer);
  }, [map]);
  return;
}

export default Marker;
