var Sidebar = Sidebar || {};

(function (MapPane) {
  let $btnAddLayer = $("#btn-add-layer");
  let $dataInputField = $("#data-input-field");
  let $selectDataType = $("#select-data-type");

  Sidebar._getInputFieldInnerText = function () {
    return $dataInputField.val();
  };

  Sidebar._parseCoordinateText = function (text) {
    let values = text.split(/[, \n]+/).map(val => parseFloat(val));
    console.assert(values.length % 2 == 0)

    var latlngs = [];
    for (var i = 0, len = values.length; i < len; i += 2) {
      latlngs.push([values[i], values[i + 1]]);
    }

    return latlngs;
  };

  Sidebar._splitLines = function (text) {
    let lines = text.split(/[\n]+/);
    return lines;
  };


  Sidebar._handleClickAddLayer = function  (e) {
    e.preventDefault();
    let innerText = Sidebar._getInputFieldInnerText();
    let dataType = $selectDataType.find(":selected");

    switch (dataType.val()) {
      case "GeoJSON":
        console.log()
        break;
      case "Coordinates (Longitude-Latitude)":
        let latlngs = Sidebar._parseCoordinateText(innerText);
        MapPane.renderPointLayer(latlngs);
        break;
      case "Lines (WKT)":
        let lines = innerText.split("\n");
        MapPane.renderLineLayer(lines);
        break;
      default:
        cosole.error("Invalid data type")
    }
    return false;
  }

  $btnAddLayer.on('click', Sidebar._handleClickAddLayer)
})(MapPane);

(function () {
  'use strict';

  Sidebar.Item = Backbone.Model.extend({
    defaults: {
      title: ''
    }
  })
})();

(function () {
  'use strict';

  var ItemList = Backbone.Collection.extend({
    model: Sidebar.Item,

    localStorage: new Backbone.LocalStorage('items-backbone'),

    comparator: 'order'
  });

  Sidebar.items = new ItemList();
})
