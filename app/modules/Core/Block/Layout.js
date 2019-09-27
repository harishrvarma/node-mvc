
const Abstract = require('./Abstract');

module.exports = class Layout extends Abstract
{
	constructor()
	{
		super();
		this.setTemplate('Core/View/layout.jsx');
		this.setLayout(this);
		
	}

	presetChildren()
	{
		this.addChild('header', this.createChild('Admin/Block/Layout/Body/Header'));
		this.addChild('content', this.createChild('Admin/Block/Layout/Body/Content'));
		this.addChild('footer', this.createChild('Admin/Block/Layout/Body/Footer'));
		return this;
	}
}