
module.exports = class Abstract
{
	ccc = null;
	request = null;
	response = null;

	#layout = null;

	error()
	{
		this.response.send("<h1>The page you are trying to access does not exist on server.</h1>");
	}

	objectManager(className)
	{
		let object = new (this.ccc.load.class(className))();
		object.ccc = this.ccc;
		return object;
	}

	sendJson(data, patterned = false)
	{
		if(patterned)
		{
			let response = {
				status:'success',
				states:{},
				elements:{},
				actions:{}
			};

			data = Object.assign(response, data);
		}

		if(typeof(data) !== 'object')
		{
			throw "please send json response";
		}

		this.response.set('Content-Type', 'application/json');
		this.response.send(data);
	}

	sendHtml(data)
	{
		this.response.set('Content-Type', 'text/html');
		this.response.send(data);
	}

	redirect(action = null, controller = null, route = null, params = null, resetParam = true)
	{
		let url = this.objectManager('Core/Model/Url').getUrl(action, controller, route, params, resetParam);
		this.response.redirect(url);
	}

	getUrl(action = null, controller = null, route = null, params = null, resetParam = true)
	{
		return this.objectManager('Core/Model/Url').getUrl(action, controller, route, params, resetParam);
	}


	// Layout Plugin Methods

	loadLayout(layout = null)
	{
		return this.setLayout(layout).getLayout();
	}

	setLayout(layout = null)
	{
		if(layout == null)
		{
			layout = this.objectManager('Core/Block/Layout');
			layout.presetChildren();
		}

		this.#layout = layout;
		return this;
	}

	getLayout()
	{
		return this.#layout;
	}

	renderLayout()
	{
		this.response.end(this.getLayout().renderLayout());
	}
}
