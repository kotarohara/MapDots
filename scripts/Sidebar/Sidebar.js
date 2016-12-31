var Sidebar = Sidebar || {};

(function (MapPane) {
  let $btnAddLayer = $("#btn-add-layer");
  let $dataInputField = $("#data-input-field");

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


  Sidebar._handleClickAddLayer = function  (e) {
    e.preventDefault();
    let innerText = Sidebar._getInputFieldInnerText();
    let latlngs = Sidebar._parseCoordinateText(innerText);
    MapPane.renderPointLayer(latlngs);
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
