module.exports = function(api) {
	var brandColor = '#993f99';
	var paragraphBorder = function(size, side) {
		var side = side ? side : '-top';
		var result = {};
		result['border' + side] = (size > 2 ? 'dotted ' : 'solid ') + size + 'px #999';
		return result;
	}
	api.add({
		body: {
			fontSize: '20px',
			p: [
				{ color: brandColor },
				paragraphBorder(3, '-left')
			]
		}
	});
}


// $brandColor: #993f99;

// @mixin paragraph-border($size, $side: '-top') {
//   @if $size > 2px {
//     border#{$side}: dotted $size #999;
//   } @else {
//     border#{$side}: solid $size #999;
//   }
// }

// body {
//   font-size: 20px;
//   p {
//     color: $brandColor;
//     @include paragraph-border(3px, '-left')
//   }
// }