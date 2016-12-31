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

  MapPane.renderLineLayer = function (wktLines) {
      console.assert(wktLines.length > 0);
      let layerName = "layer-line-" + layerIndex;
      let sourceName = "source-line-" + layerIndex;
      layerIndex += 1;

      var wkt = new Wkt.Wkt()
      var features = wktLines.map(function (line) {
        wkt.read(line);
        return {
          "type": "Feature",
          "properties": {},
          "geometry": wkt.toJson()
        };
      });

      let geojson = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": features
            }
      };


      MapPane.map.addSource(sourceName, geojson);
      MapPane.map.addLayer({
        "id": sourceName,
        "type": "line",
        "source": sourceName,
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 3
        }
      });
  };

  MapPane.renderPointLayer = function (latlngs) {
    console.assert(latlngs.length > 0);
    let layerName = "layer-point-" + layerIndex;
    let sourceName = "source-point-" + layerIndex;
    layerIndex += 1;

    let geojson = MapPane._latLngsToGeoJSON(latlngs);

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
    });
  }


  function handleMapOnLoad () {
  }

  map.on('load', handleMapOnLoad);
})(Sidebar);
