
const CoreAdmin = require('./../../Core/Controller/Admin');

module.exports = class Product extends CoreAdmin
{
	constructor()
	{
		super();
	}

	listAction()
	{
		//let product = this.objectManager('Catalog/Model/Product');

		this.response.send("<p>Excellent Job....list</p>");
	}

	saveAction()
	{	
		console.log(this.request.params);
		this.response.send("Excellent Job....save");
	}


	deleteAction()
	{		
		console.log(this.request.params);
		this.response.send("Excellent Job....delete");
	}

	addAction()
	{
		let adminModel = this.objectManager('Admin/Model/Admin');
		let admins = adminModel.getAdapter().fetchAll("SELECT * FROM `admin`");
		this.sendJson(admins);		
	}

	editAction()
	{		
		console.log(this.request.params);
		this.response.send("Excellent Job....contact");
	}
}