import React, { useEffect } from "react";
import Draw from "ol/interaction/Draw";
import { Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import image from "./../icon/marker.png";
import { Style, Icon } from "ol/style";

function DrawFeature({ map }) {
  useEffect(() => {
    if (!map) return;
    const source = new VectorSource({ warpX: false });
    var markerStyle = new Style({
      image: new Icon({
        src: image,
        scale: 0.05,
      }),
    });
    const vector = new VectorLayer({
      source: source,
      zIndex: 50,
      style: markerStyle,
    });

    map.addLayer(vector);
    const typeSelect = document.getElementById("type");
    let draw;
    function addInteraction() {
      const value = typeSelect.value;
      if (value !== "None") {
        draw = new Draw({
          source: source,
          type: typeSelect.value,
        });
        map.addInteraction(draw);
      }
    }
    typeSelect.onchange = function () {
      map.removeInteraction(draw);
      addInteraction();
    };
    document.getElementById("undo").addEventListener("click", function () {
      draw.removeLastPoint();
    });

    addInteraction();
  }, [map]);

  return (
    <div
      class="row"
      className="absolute z-50 top-0 right-[50%] translate-x-[50%] bg-slate-100"
    >
      <div class="col-auto">
        <span class="input-group">
          <label class="input-group-text" for="type">
            Geometry type:
          </label>
          <select class="form-select" id="type">
            <option value="None">None</option>
            <option value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
          </select>
          <input class="form-control" type="button" value="Undo" id="undo" />
        </span>
      </div>
    </div>
  );
}

export default DrawFeature;
