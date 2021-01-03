var wheels = require("./wheels.js");
wheels.init("winter");
wheels.info();

var Control = require("./control.js");
var c = new Control();
c.forward();
c.right();

var AirConditioning = require("./air.js");
var air = new AirConditioning();
air.on("started", function(data) {
	console.log("Air conditioning started. Status: " + data.status);
});
air.start();