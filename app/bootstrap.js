
class Abstract
{
	ccc = null;

	objectManager(className)
	{
		let object = new (this.ccc.load.class(className))();
		object.ccc = this.ccc;
		return object;
	}
}

module.exports = Abstract;