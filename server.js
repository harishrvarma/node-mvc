var ccc = {};

Object.assign(ccc, require('./app/etc/local.js'));
Object.assign(ccc, require('./app/etc/function.js'));
Object.assign(ccc, require('./app/etc/module.js'));

ccc.core.app = require('express')();
let bodyParser = require("body-parser");
let cors = require('cors')

ccc.core.app.use(bodyParser.urlencoded({ extended: true }));
ccc.core.app.use(bodyParser.json());
ccc.core.app.use(cors());

ccc.core.app.listen(ccc.server.port);

ccc.init = function()
{
	let Front = ccc.load.class('Core/Controller/Front');
	(new Front()).setCcc(ccc).init();
}

ccc.__ = function(key, val)
{
	ccc.data[key] = val;
	return this;
}

ccc.init();