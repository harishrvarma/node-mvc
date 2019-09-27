const Abstract = require('./../Abstract');

module.exports = class Router extends Abstract
{
	namespace = 'Ccc/Model/Router';

	load()
	{
		if(typeof(this.ccc.modules) != 'object')
		{
			throw "Router : Unable to initilize modules";
		}

		for (let [moduleName, moduleParams] of Object.entries(this.ccc.modules)) 
		{
			let canProceed = this._loadModuleRoute(moduleName, moduleParams);
			if(!canProceed)
			{
				continue;
			}			
		}
		return this;
	}

	_loadModuleRoute(moduleName, moduleParams)
	{
		if(typeof(this.ccc.routes) == 'undefined')
		{
			this.ccc.routes = [];
		}		

		if(moduleParams.active != true)
		{
			return false;
		}

		let routesInner = this.ccc.load.class(moduleName + '/etc/routes');

		if(typeof(routesInner) == 'undefined')
		{
			return false;
		}

		for(let [key, route] of Object.entries(routesInner))
		{
			this.ccc.routes.push(route);
		}
		
		return true;
	}

	execute()
	{
		let routes = this.ccc.routes;
		if(typeof(routes) != 'object')
		{
			throw "application routes not loaded yet.";
		}

		let self = this;
		for (var i = routes.length - 1; i >= 0; i--)
		{
			let route = routes[i];
			self.ccc.core.app[route.method](route.key, (request, response) =>
			{
				self._executeModule(route, request, response);
			});
		}
		return this;
	}

	_executeModule(route, request, response)
	{
		if(typeof(request.params.module) == 'undefined')
		{
			request.params.module = route.module;
			request.params.controller = route.controller;
			request.params.action = route.action;
		}

		this.ccc.http.request	= request;
		this.ccc.http.response 	= response;

		let controller 	= this.objectManager(this.getControllerName(this.ccc.http.request.params));
		let action = this.getActionName(this.ccc.http.request.params);

		controller.request 	= this.ccc.http.request;
		controller.response = this.ccc.http.response;

		if(typeof(controller[action]) == 'undefined')
		{
			controller['error']();
		}
		else
		{
			controller[action]();
		}
	}


	
	

	getActionName(params)
	{
		if(params.action.length > 30)
		{
			throw "action name should not exists 30 character";
		}

		let action = params.action + '-action';
		action = action.split('-').map((s,k) => {
			if(k!=0)
			{
				return s.charAt(0).toUpperCase() + s.substring(1) 
			}
			else
			{
				return s;
			}
		}).join('');
		return action;

	}	

	getControllerName(params)
	{
		if(params.controller.length > 30)
		{
			throw "controller name should not exists 30 character";
		}

    	let controller = params.module + '_controller_' + params.controller;
    	controller = controller.toLowerCase().split('_').map((s) => 
		{
			return s.charAt(0).toUpperCase() + s.substring(1);

		}).join('/');
    	
		return controller;
	}
}