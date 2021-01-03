var app = (function() {
	var todos, content, list, add, edit, router;
	var showList = function() {
		content.empty().append(list.render().$el);
	}
	var showNewToDoForm = function() {
		content.empty().append(add.$el);
		add.delegateEvents();
	}
	var showEditToDoForm = function(data) {
		content.empty().append(edit.render(data).$el);		
	}
	var home = function() {
		router.navigate("", {trigger: true});
	}
	var RouterClass = Backbone.Router.extend({
		routes: {
			"new": "newToDo",
			"edit/:index": "editToDo",
			"": "list"
		},
		list: showList,
		newToDo: showNewToDoForm,
		editToDo: function(index) {
			showEditToDoForm({ index: index });
		}
	});
	var init = function() {
		todos = new app.collections.ToDos();
		list = new app.views.list({model: todos});
		edit = (new app.views.edit({model: todos}));
		add = (new app.views.add({model: todos})).render();
		content = $("#content");
		todos.fetch({ success: function() {
			router = new RouterClass();
			Backbone.history.start();
		}});
		add.on("saved", home);
		edit.on("edited", home);
	}
	return {
		models: {},
		collections: {},
		views: {},
		init: init
	}
})();