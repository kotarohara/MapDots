var MapPane = MapPane || {};

(function (Sidebar) {
  var layerIndex = 0;

  mapboxgl.accessToken = 'pk.eyJ1Ijoia290YXJvaGFyYSIsImEiOiJDdmJnOW1FIn0.kJV65G6eNXs4ATjWCtkEmA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 14,
    center: [-79.943441, 40.443434]
  });

  MapPane.map = map;

  MapPane._latLngsToGeoJSON = function (latlngs) {
    let features = latlngs.map(c => turf.point(c));
    let geojson = {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": features
          }
      };
    return geojson;
  }

  MapPane.renderPointLayer = function (latlngs) {
    console.assert(latlngs.length > 0);
    let layerName = "layer-point-" + layerIndex;
    layerIndex += 1;

    let geojson = MapPane._latLngsToGeoJSON(latlngs);
    let sourceName = "source-point-" + layerIndex;
    MapPane.map.addSource(sourceName, geojson);
    MapPane.map.addLayer({
      "id": sourceName,
      "type": "circle",
      "source": sourceName,
      "paint": {
        "circle-radius": 7,
        "circle-color": "#007cbf",
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 3
      }
    })
  }


  function handleMapOnLoad () {
      let latlngs = [[-79.943441, 40.443434], [-79.9238901390978, 40.4]];
      MapPane.renderPointLayer(latlngs);

    //   map.addSource("route", {
    //     "type": "geojson",
    //     "data": {
    //         "type": "Feature",
    //         "properties": {},
    //         "geometry": {
    //             "type": "LineString",
    //             "coordinates": [
    //                 [-79.943441, 40.443434],
    //                 [-79.9238901390978, 40.4]
    //             ]
    //         }
    //     }
    // });
    //
    // map.addLayer({
    //     "id": "route",
    //     "type": "line",
    //     "source": "route",
    //     "layout": {
    //         "line-join": "round",
    //         "line-cap": "round"
    //     },
    //     "paint": {
    //         "line-color": "#000000",
    //         "line-width": 5
    //     }
    // });
  }

  map.on('load', handleMapOnLoad);
})(Sidebar);
