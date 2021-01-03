app.views.list = Backbone.View.extend({
	events: {
        'click #delete': 'deleteToDo',
        'click #change-status': 'changeStatus'
	},
    getIndex: function(e) {
        return parseInt(e.target.parentNode.getAttribute("data-index"));
    },
    deleteToDo: function(e) {
        this.model.at(this.getIndex(e)).destroy();
        this.render();
    },
    changeStatus: function(e) {
        var self = this;
        var model = this.model.at(this.getIndex(e));
        model.save({ done: !model.get("done") }, {
            wait: true,
            success: function() {
                self.render()
            }
        });
    },
    render: function() {
    	var html = '<ul class="list">', 
    		self = this;
    	this.model.each(function(todo, index) {
			var template = _.template($("#tpl-list-item").html());
    		html += template({ 
    			text: todo.get("text"),
    			index: index,
                done: todo.get("done") ? "done" : "not-done",
                statusLabel: todo.get("done") ? "mark as not done" : "mark as done"
    		});
    	});
    	html += '</ul>';
    	this.$el.html(html);
    	this.delegateEvents();
    	return this;
    }
});