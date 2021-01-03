var through2 = require('through2');
var path = require('path');
var fs = require("fs");
module.exports = function () {
    function transform (file, enc, next) {
        var stat = fs.statSync(file.path);
        var result = 'Filesize of ' + path.basename(file.path) + ': ';
        result += stat.size + 'bytes';
        fs.writeFileSync(__dirname + '/../build/size.log', result);
        this.push(file);
        next();
    }
    return through2.obj(transform);
};