const Abstract = require('./../../../../Core/Block/Abstract');

module.exports = class Header extends Abstract
{
	constructor()
	{
		super();
		this.setTemplate('Admin/View/layout/body/header.jsx');
	}
}


  