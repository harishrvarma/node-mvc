const Abstract = require('./Abstract');
const React = require('react');

module.exports = class TextList extends Abstract
{
	data = {};

	constructor()
	{
		super();
		this.setTemplate('Core/View/textlist.jsx');
	}

	set(key, val)
	{
		if(typeof key == 'undefined')
		{
			throw "Key is not valid.";
		}
		this.data[key] = val;
	}

	get(key)
	{	
		if(typeof key == 'undefined')
		{
			return null;
		}

		if(typeof this.data[key] == 'undefined')
		{
			return null;
		}
		return this.data[key];
	}

}