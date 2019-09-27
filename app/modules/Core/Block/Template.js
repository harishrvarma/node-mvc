const Abstract = require('./Abstract');

module.exports = class Template extends Abstract
{
	constructor()
	{
		super();
		this.setTemplate('Core/View/template.jsx');
	}
}