
const CoreAdmin = require('./../../Core/Controller/Admin');

module.exports = class Admin extends CoreAdmin
{
	constructor()
	{
		super();
	}

	_prepareList(collection)
	{
		let html = '';

		if(collection.length == 0)
		{
			html += 'No records.';
			return html;
		}		
		
		html = '<table width="50%" border="1" cellpadding="4">';
		html += '<tr>';

		for(let [key] of Object.entries(collection[0]))
		{
			html += '<td><b>'+ key + '</b></td>';
		}
		html += '<td>Actions</td>';
		html += '</tr>';

		for(let [key,row] of Object.entries(collection))
		{
			html += '<tr>';
			for(let [key,val] of Object.entries(row))
			{
				html += '<td>'+ val + '</td>';
			}
			html += '<td>';
			html += '<a href="'+ this.getUrl('edit',null,null,{id : row.adminId}) +'">Edit</a> ';
			html += '<a href="'+ this.getUrl('delete',null,null,{id : row.adminId}) +'">Delete</a>';
			html += '</td>';
			html += '</tr>';
		}
		
		html += '</table>';
		return html;
	}

	indexAction()
	{
		let adminModel = this.objectManager('Admin/Model/Admin');

		let admins = adminModel.getAdapter().fetchAll('SELECT * FROM `admin` ORDER BY adminId DESC');

		let html = this._prepareList(admins);
		
		this.sendHtml(html);
	}

	addAction()
	{
		let layout = this.loadLayout();

		layout.getChild('content').addChild('add', layout.createChild('Admin/Block/Admin/Add'));

		this.renderLayout();

		//let html = "<form action='"+ this.getUrl('save') +"' method='post'><input type='text' name='admin[username]'> <input type='text' name='admin[password]'> <input type='submit' name='createAdmin' value='Add'></form>";
		
		//let html = this.objectManager('Core/Block/Layout').list().toHtml();

		/*templates.index(
		{
	    	HelloWorld: HelloWorld,
	    	title: 'Hello world',
	    	another: 'variable'
	  	}, 
	  	{ 
	  		html: true 
	  	});*/



		//this.response.end(html);
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

			let html = "<form action='"+ this.getUrl('save',null,null,null,false) +"' method='post'><input type='text' name='admin[username]' value='"+ admin.get('username') +"'> <input type='text' name='admin[password]' value='"+ admin.get('password') +"'> <input type='submit' name='createAdmin' value='Update'></form>";
			
			this.sendHtml(html);
		}
		catch(e)
		{
			this.sendHtml(e);
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

			this.redirect('index');

		}
		catch(e)
		{
			this.sendHtml(e);
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
			let postData = this.request.body.admin;

			let admin = this.objectManager('Admin/Model/Admin');			
			if(adminId > 0)
			{
				admin = this.objectManager('Admin/Model/Admin').load(adminId);
			}

			admin.set('username', postData.username);
			admin.set('password', postData.password);
			admin.save();

			this.redirect('index', 'admin','admin');
		}
		catch(e)
		{
			this.sendHtml(e);
		}
	}

	
}