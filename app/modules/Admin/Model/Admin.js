
const Table = require('./../../Core/Model/Db/Table');

module.exports = class Admin extends Table
{
	namespace 	= 'Admin/Model';
	
	constructor()
	{
		super();
		this.init('admin', 'adminId');
	}
}