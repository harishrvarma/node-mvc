
module.exports = [
	{
		key : '/admin/login',
		module : 'Admin',
		controller : 'Login',
		action : 'login',
		method : 'all',
	},

	{
		key : '/admin/login-post',
		module : 'Admin',
		controller : 'Login',
		action : 'login-post',
		method : 'post',
	},
];
