app.collections.ToDos = Backbone.Collection.extend({
  	model: app.models.ToDo,
    url: '/api/all'
});