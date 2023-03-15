import { useEffect } from "react";
import { Overlay } from "ol";
function Popup({ map }) {
  useEffect(() => {
    if (!map) return;
    const overlayContainerElement =
      document.querySelector(".overlay-container");
    const overlayLayer = new Overlay({
      element: overlayContainerElement,
    });
    map.addOverlay(overlayLayer);
    const overlayFeatureName = document.getElementById("feature-name");

    map.on("click", function (e) {
      overlayLayer.setPosition(undefined);
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        let clickedCoordinate = e.coordinate;
        let clickedFeature = feature.get("City");
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeature;
      });
    });
  }, [map]);
  return (
    <div class="overlay-container">
      <span class="overlay-text" id="feature-name"></span>
      <br />
    </div>
  );
}

export default Popup;
