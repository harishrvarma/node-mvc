const Abstract = require('./../../../../Core/Block/Abstract');

module.exports = class Footer extends Abstract
{
	constructor()
	{
		super();
		this.setTemplate('Admin/View/layout/body/footer.jsx');
	}
}


  