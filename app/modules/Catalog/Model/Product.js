
const Table = require('./../../Core/Model/Db/Table');

module.exports = class Product extends Table
{
	namespace 	= 'Catalog/Model';
	tableName	= 'product';
	primaryKey	= 'productId';

	constructor()
	{
		super();
	}
}