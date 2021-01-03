var typeOfTires;
exports.init = function(type) {
    typeOfTires = type;
}
exports.info = function() {
	console.log("The car use " + typeOfTires + " tires.");
}
