const Abstract = require('./../../../Core/Block/Abstract');

module.exports = class List extends Abstract
{
	constructor()
	{
		super();
		this.setTemplate('Admin/View/admin/list.jsx');
	}
}


  