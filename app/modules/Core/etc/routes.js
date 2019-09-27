
module.exports = [
	{
		key : '/core',
		method : 'all',
		module : 'Catalog',
		controller : 'Product',
		action : 'save',		
	},
	{
		key : '/:module/:controller/:action',
		method : 'all',
		module : null,
		controller : null,
		action : null,
	}
];
