define(function(undefined){

var toString, toStringMap, toStringRegex, toElementRegex, typ;

toString    = Object.prototype.toString;
toStringMap = {};

toStringRegex  = /(\[object\ |\])/g;
toElementRegex = /html[\w]*element/;

typ = {
	of: function(toTest){
		var type, mType;

		type = toString.call(toTest)
			.replace(toStringRegex, '')
			.toLowerCase();

		mType = toStringMap[type];

		if (!mType && type.match(toElementRegex)) {
			mType = 'element';
		}

		return mType || type;
	},

	add: function(base, conversion){
		var key;
		if (typ.of(base) === 'string') {
			toStringMap[base.toLowerCase()] = conversion.toLowerCase();
		} else if (typ.of(base) === 'object') {
			for (key in base) {
				if (base.hasOwnProperty(key)) {
					toStringMap[key.toLowerCase()] = base[key].toLowerCase();
				}
			}
		}

		return this;
	},

	remove: function(){
		var k;
		for (k = 0; k < arguments.length; k++) {
			toStringMap[arguments[k]] = undefined;
		}
		return this;
	},

	removeAll: function(){
		toStringMap = {};
		return this;
	}
};

return typ;

});
