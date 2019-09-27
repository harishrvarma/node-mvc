const Abstract = require('./Abstract');
const queryString = require('querystring');

class Url extends Abstract
{
	getUrl(action = null, controller = null, route = null, params = null, resetParam = true)
	{
		let request = this.ccc.http.request;

		let final = {
			action : (action) ? action : request.params.action,
			controller : (controller) ? controller : request.params.controller,
			module : (route) ? route : request.params.module
		};

		let url = this.ccc.config.baseUrl + final.module + '/' + final.controller + '/' + final.action;
		if(resetParam && !params)
		{
			return url;
		}

		if(Array.isArray(params))
		{
			url += '/' + params.join('/');
		}
		else
		{
			final.params = (resetParam) ? {} : request.query;
			final.params = (!params) ? final.params : Object.assign(final.params, params);
			url 		+= '?' + queryString.stringify(final.params);
		}
		return url;
	}
}

module.exports = Url;