// Based on the example Backbone application that uses
// [LocalStorage adapter](backbone-localstorage.html).

$(function(){
  var Layer = Backbone.Model.extend({

    defaults: function() {
      return {
        title: "empty layer...",
        order: Layers.nextOrder(),
        visible: false
      };
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

    toggle: function() {
      this.save({visible: !this.get("visible")});
    }

  });

  var LayerList = Backbone.Collection.extend({

    model: Layer,

    localStorage: new Backbone.LocalStorage("layers-backbone"),

    visible: function() {
      return this.filter(function(layer){ return layer.get('visible'); });
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(layer) {
      return layer.get('order');
    }

  });

  var Layers = new LayerList;

  var LayerView = Backbone.View.extend({

    tagName:  "li",

    template: _.template($('#layer-template').html()),

    events: {
      "click .toggle"   : "toggleShow",
      "click a.destroy" : "clear"
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('visible', this.model.get('visible'));
      return this;
    },

    toggleShow: function() {
      this.model.toggle();
    },

    clear: function() {
      this.model.destroy();
    }

  });

  var AppView = Backbone.View.extend({
    el: $("#app-window"),
    events: {
      "click #btn-add-layer": "createOnClick"
    },

    initialize: function() {
      this.option = this.$("#select-data-type :selected");
      this.listenTo(Layers, 'add', this.addOne);
      this.main = $('#layer-main');
      Layers.fetch();
    },

    render: function() {
      if (Layers.length) {
        this.main.show();
      } else {
        this.main.hide();
      }
    },

    addOne: function(layer) {
      var view = new LayerView({model: layer});
      this.$("#layer-list").append(view.render().el);
    },

    // addAll: function() {
    //   Layers.each(this.addOne, this);
    // },

    createOnClick: function (e) {
      Layers.create({title: this.option.val()});
    }
  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
