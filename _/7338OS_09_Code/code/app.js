var fs = require('fs');
module.exports = {
	fileContent: '',
	read: function(filePath) {
		var content = fs.readFileSync(filePath).toString();
		this.fileContent = content;
		return content;
	},
	check: function(word, content) {
		content = content || this.fileContent;
		return content.indexOf(word) >= 0 ? true : false;
	}
}