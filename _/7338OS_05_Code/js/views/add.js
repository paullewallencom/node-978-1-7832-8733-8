app.views.add = Backbone.View.extend({
	events: {
        "click button": "save"
	},
    save: function() {
        var textarea = this.$el.find("textarea");
        var value = textarea.val();
        if(value != "") {
            var self = this;
            this.model.create({ text: value }, { 
                wait: true,
                success: function() {
                    textarea.val("");
                    self.trigger("saved");
                } 
            });
        } else {
            alert("Please, type something.");
        }
    },
    render: function() {
    	var template = _.template($("#tpl-todo").html());
    	this.$el.html(template());
    	this.delegateEvents();
    	return this;
    }
});