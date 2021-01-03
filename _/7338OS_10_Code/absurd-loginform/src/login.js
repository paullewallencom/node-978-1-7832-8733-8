module.exports = function(api) {

	var textColor = '#9E9E9E';
	var textColorLight = api.lighten('#9E9E9E', 50);
	var textColorDark = api.darken('#9E9E9E', 50);
	var brandColor = '#8DB7CD';
	var brandColorLight = api.lighten('#8DB7CD', 50);
	var brandColorDark = api.darken('#8DB7CD', 30);
	var warning = '#F00';

	var input = function(selector, addons) {
		var result = {};
		result[selector] = {
			'-wm-border-radius': '4px',
			'-wm-box-sizing': 'border-box',
			marginBottom: '20px',
			border: 'solid 3px ' + brandColor,
			width: '100%',
			padding: '8px',
			'&:focus': {
				outline: 0,
				background: textColorLight
			}
		}
		if(addons) {
			for(var prop in addons) {
				result[selector][prop] = addons[prop];
			}
		}
		return result;
	}

	api.add({
		body: {
			width: '100%', height: '100%',
			margin: 0, padding: 0,
			color: textColor,
			fontFamily: 'Arial',
			'#login': [
				{ 
					width: '400px', 
					margin: '0 auto',
					padding: '30px 0 0 30px',
					label: { 
						display: 'block',
						margin: '0 0 10px 0',
						color: textColorDark
					}
				},
				input('input[type="text"]'),
				input('input[type="text"].error', {
					border: 'solid 1px ' + warning
				}),
				input('input[type="password"]', {
					marginBottom: '40px'
				}),
				input('input[type="submit"]', {
					gradient: brandColorLight + '/' + brandColor,
					width: '80px'
				}),
				input('input[type="button"]', {
					gradient: brandColorLight + '/' + brandColor,
					width: '80px',
					transparent: 0.6,
					'&:hover': {
						transparent: 1
					}
				})
			]
		}
	});

}