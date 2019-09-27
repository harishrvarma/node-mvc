
module.exports = class Front
{
	ccc = null;
	
	setCcc(ccc)
	{
		this.ccc = ccc;
		return this;
	}

	objectManager(className)
	{
		let object = new (this.ccc.load.class(className))();
		object.ccc = this.ccc;
		return object;
	}
	
	init()
	{
		if(typeof(this.ccc.modules) != 'object')
		{
			throw "Unable to initilize modules";
		}

		this.objectManager('Core/Model/Router/Router').load().execute();
	}
}