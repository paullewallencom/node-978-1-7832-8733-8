app.models.ToDo = Backbone.Model.extend({
    defaults: {
        text: '',
        done: false
    },
    url: function() {
    	return '/api/todo/' + this.get("id");
    }
});