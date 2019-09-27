
module.exports = {
	server: {
		port : 3001,
		host : 'localhost'
	},
	core : {},
	http : {},
	env : 'production',
	db:{
		production : 
		{
			default : 'first',
			first: 
			{
				host: "localhost",
				user: "root",
				port: 3306,
				password: "",
				database: 'nodejs_first'
			},
			second: 
			{
				host: "localhost",
				user: "root",
				port: 3306,
				password: "",
				database: 'nodejs_second'
			}
		},
		local : 
		{
			default : 'default',
			default: 
			{
				host: "localhost",
				user: "root",
				port: 3306,
				password: "",
				database: 'nodejs_second'
			}
		}
	},
	adapter:{},
	config:
	{
		baseUrl : 'http://localhost:3001/'
	}
};
