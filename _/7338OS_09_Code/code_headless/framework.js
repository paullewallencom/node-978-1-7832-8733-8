var test = function(description, callback) {
	console.log(description);
	callback(function(subject) {
		return {
			toBe: function(value) {
				if(subject !== value) {
					console.log("! Expect '" + subject + "' to be '" + value + "'.")
				}
			},
			toBeDefined: function() {
				if(typeof subject === 'undefined') {
					console.log("! Expect '" + subject + "' to be defined")
				}
			}
		}
	});
}