app.views.edit = Backbone.View.extend({
	events: {
        'click button': 'save'
	},
    save: function() {
        var textarea = this.$el.find('textarea');
        var value = textarea.val();
        if(value != '') {
            var self = this;
            this.selectedModel.save({text: value}, {
                wait: true,
                success: function() {
                    self.trigger('edited');
                }
            });
        } else {
            alert('Please, type something.');
        }
    },
    render: function(data) {
        this.selectedModel = this.model.at(data.index);
    	var template = _.template($('#tpl-todo').html());
    	this.$el.html(template());
        this.$el.find('textarea').val(this.selectedModel.get('text'));
    	this.delegateEvents();
    	return this;
    }
});