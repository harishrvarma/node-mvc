
const CoreAdmin = require('./../../Core/Controller/Admin');

module.exports = class Admin extends CoreAdmin
{
	constructor()
	{
		super();
	}

	listAction()
	{
		let adminModel = this.objectManager('Admin/Model/Admin');
		let admins = adminModel.getAdapter().fetchAll('SELECT * FROM `admin` ORDER BY adminId DESC');

		this.sendJson({
			states : {
				collection : admins
			}
		}, true);		
	}

	editAction()
	{
		try
		{
			let adminId = this.ccc.cast.int(this.request.query.id);

			if(!adminId)
			{
				throw "Invalid request.";
			}

			let admin = this.objectManager('Admin/Model/Admin').load(adminId);

			if(!admin.get('adminId'))
			{
				throw "Invalid request Id.";
			}
			
			this.sendJson({
				states : {
					row : admin.getData()
				}
			}, true);

		}
		catch(e)
		{
			this.sendJson({
				status:'failure',
				message : e
			}, true);
		}		
	}

	saveAction()
	{
		try
		{
			if(this.request.method != 'POST')
			{
				throw 'Invalid request';
			}

			let adminId = this.ccc.cast.int(this.request.query.id);
			let postData = this.request.body.row;

			let admin = this.objectManager('Admin/Model/Admin');		
			if(adminId > 0)
			{
				admin = this.objectManager('Admin/Model/Admin').load(adminId);
			}

			admin.setData(postData);
			/*admin.set('username', postData.username);
			admin.set('name', postData.name);
			admin.set('email', postData.email);
			*/
			admin.save();

			this.sendJson({
				message: 'Row saved successfully.'
			}, true);

		}
		catch(e)
		{
			this.sendJson({
				status:'failure',
				message: e
			}, true);
		}		
	}

	deleteAction()
	{
		try
		{
			let adminId = this.ccc.cast.int(this.request.query.id);

			if(!adminId)
			{
				throw "Invalid request.";
			}

			let admin = this.objectManager('Admin/Model/Admin').load(adminId);
			if(!admin.get('adminId'))
			{
				throw "Invalid request Id.";
			}

			admin.delete();

			this.sendJson({
				message : 'Row was deleted.'
			}, true);

		}
		catch(e)
		{
			this.sendJson({
				status:'failure',
				message : e
			}, true);
		}		
	}

	
}