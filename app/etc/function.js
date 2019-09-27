const path = require('path');


module.exports = {
	fn : {
		baseUrl : function(suffix = null)
		{
			let url = 'http://localhost:3001/';
			if(suffix)
			{
				url += suffix;
			}
			return url;
		},
		baseDir : function(suffix = null)
		{
			let dir = process.cwd() + path.sep;
			if(suffix)
			{
				dir += suffix;
			}
			return dir;
		},

		className : (obejct) => {

			return obejct.namespace + '/' + obejct.constructor.name;

		}
	},

	cast : {
		int : (val) => {
			val = parseInt(val);
			return (isNaN(val)) ? 0 : val;
		} 
	},

	load : {
		class : (className) => 
		{
			return require(`${process.cwd()}${path.sep}app${path.sep}modules${path.sep}${className}`);
		}
	}
};
