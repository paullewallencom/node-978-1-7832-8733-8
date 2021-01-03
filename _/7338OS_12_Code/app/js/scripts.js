var fs = require('fs');
var path = require('path');
var root = path.normalize(process.cwd());

var Tree = function() {

	var api = {},
		el,
		currentLocationArea,
		treeArea,
		fileArea,
		html = '',
		maxLevels = 3;

	api.cwd = root;
	api.csf = null;

	var updateCurrentLocation = function() {
		currentLocationArea.innerHTML = api.cwd;
	}
	var addItem = function(itemPath, fullPath, isFile, indent) {
		itemPath = path.normalize(itemPath).replace(root, '');
		var calculateIndent = function() {
			var tab = '&nbsp;&nbsp;&nbsp;&nbsp;', str = '';
			for(var i=0; i<indent; i++) {
				str += tab;
			}
			return str;
		}
		if(isFile) {
			html += '<a href="#" class="file" data-path="' + fullPath + '">';
			html += calculateIndent(indent) + '<i class="fa fa-file-o"></i> ' + itemPath + '</a>';
		} else {
			html += '<a href="#" class="dir" data-path="' + fullPath + '">';
			html += calculateIndent(indent) + '<i class="fa fa-folder-o"></i> ' + itemPath + '</a>';
		}
	}
	var walk = function(dir, level, done) {
		if(level === maxLevels) {
			done(); 
			return;
		}
	  	fs.readdir(dir, function(err, list) {
		    if (err) return done(err);
		    var i = 0;
	    	(function next() {
	      		var file = list[i++];
	      		if(!file) return done();
      			var filePath = dir + '/' + file;
      			fs.stat(filePath, function(err, stat) {
		        	if (stat && stat.isDirectory()) {
		        		addItem(file, filePath, false, level);
		          		walk(filePath, level + 1, function() {			            		
		            		next();
		          		});
		        	} else {
		        		if(level === 0) {
		          			addItem(file, filePath, true, level);
		          		}
		          		next();
		        	}
      			});
	    	})();
	  	});
	};
	var updateFiles = function() {
		html = '<a href="#" class="dir" data-path="' + path.normalize(api.cwd + '/../') + '"><i class="fa fa-level-up"></i> ..</a>';
		walk(api.cwd, 0, function() {
			treeArea.innerHTML = html;
		});
	}
	var setEvents = function() {
		treeArea.addEventListener('click', function(e) {
			e.preventDefault();
			if(e.target.nodeName !== 'A' && e.target.nodeName !== 'I') return;
			var link = e.target.nodeName === 'A' ? e.target : e.target.parentNode;
			var itemPath = path.normalize(link.getAttribute('data-path'));
			var isFile = link.getAttribute('class') === 'file';
			if(isFile) {
				updateFileArea(itemPath);	
			} else {
				api.cwd = itemPath;
				render();
			}
		});
	}
	var render = function() {
		updateCurrentLocation();
		updateFiles();
	}
	var updateFileArea = function(itemPath) {
		var html = '';
		api.csf = itemPath;
		if(itemPath) {
			fs.stat(itemPath, function(err, stat) {
				var ext = path.extname(itemPath).toLowerCase();
				var isImage = ext === '.jpg' || ext === '.jpeg' || ext === '.png';
				html += '<h3>' + path.basename(itemPath) + '</h3>';
				html += '<p>path: ' + path.dirname(itemPath) + '</p>';
				html += '<p class="small">size: ' + stat.size + ' bytes</p>';
				html += '<p class="small">last modified: ' + stat.mtime + '</p>';
				html += '<p class="small">created: ' + stat.ctime + '</p>';
				if(isImage) {
					html += '<a href="javascript:FileBrowser.viewImage()"><i class="fa fa-picture-o"></i> View image</a>';	
				}
				html += '<a href="javascript:FileBrowser.copy()"><i class="fa fa-copy"></i> Copy</a>';
				html += '<a href="javascript:FileBrowser.move()"><i class="fa fa-share"></i> Move</a>';
				html += '<a href="javascript:FileBrowser.del()"><i class="fa fa-times"></i> Delete</a>';
				fileArea.innerHTML = html;	
			});	
		} else {
			fileArea.innerHTML = '';
		}
	}
	var getFolder = function(callback) {
		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});
	    var input = document.createElement('INPUT');
	    input.setAttribute('type', 'file');
	    input.setAttribute('webkitdirectory', 'webkitdirectory');
	    input.addEventListener('change', function (e) {
	    	callback(this.value);
		});
	    input.dispatchEvent(event);
	}

	api.init = function(selector) {
		el = document.querySelector(selector);
		currentLocationArea = el.querySelector('.current-location');
		treeArea = el.querySelector('.tree');
		fileArea = document.querySelector('.file-info');
		render();
		setEvents();
		updateFileArea();
		return api;
	}
	api.copy = function() {
		if(!api.csf) return;
	    getFolder(function(dir) {
	    	var file = path.basename(api.csf);
		    fs.createReadStream(api.csf).pipe(fs.createWriteStream(dir + '/' + file));
		    api.csf = null;
		    updateFileArea();
		    alert('File: ' + file + ' copied.');
	    });
	}
	api.move = function() {
		if(!api.csf) return;
	    getFolder(function(dir) {
	    	var file = path.basename(api.csf);
		    fs.createReadStream(api.csf).pipe(fs.createWriteStream(dir + '/' + file));
		    fs.unlink(api.csf, function() {
		    	api.csf = null;
			    alert('File: ' + file + ' moved.');
		    	setTimeout(render, 1000);
		    });
	    });
	}
	api.del = function() {
		if(!api.csf) return;
		fs.unlink(api.csf, function() {
		    alert('File: ' + path.basename(api.csf) + ' deleted.');
	    	setTimeout(render, 1000);
	    	api.csf = null;
	    });
	}
	api.viewImage = function() {
		window.open('image.html?file=' + api.csf, '_blank', 'width=600,height=400');
	}
	return api;
}

var FileBrowser;
window.onload = function() {
	FileBrowser = Tree().init('.tree-area');
}