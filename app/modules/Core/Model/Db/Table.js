const Abstract = require('./../Abstract');
const Adapter = require('./Adapter');
const SqlString = require('sqlstring');

class Table extends Abstract
{
	namespace = 'Core/Model/Db';
	#adapter = null;

	#tableName = null;
	#primaryKey = null;
		
	#data = {};
	
	constructor()
	{
		super();
	}

	init(tableName, primaryKey)
	{
		if(typeof tableName != 'string' || !tableName)
		{
			throw "tableName must be a string and non-empty";	
		}

		if(typeof primaryKey != 'string' || !primaryKey)
		{
			throw "primaryKey must be a string and non-empty";	
		}

		this.#tableName = tableName;
		this.#primaryKey = primaryKey;

		return this;
	}

	getPrimaryKey()
	{
		return this.#primaryKey;
	}

	getTableName()
	{
		return this.#tableName;
	}

	setData(data)
	{
		if(typeof(data) != 'object')
		{
			throw "data should be object.";
		}

		this.#data = Object.assign(this.#data, data);
		return this;
	}

	getData()
	{
		return this.#data;
	}

	set(key, val)
	{
		if(typeof key != 'string' || !key)
		{
			throw "key must be a string and non-empty";	
		}

		this.#data[key] = val;	
		return this;
	}

	get(key)
	{
		if(typeof key != 'string' || !key)
		{
			throw "key must be a string and non-empty";
		}

		if(typeof this.#data[key] == 'undefined')
		{
			return null;
		}

		return this.#data[key];
	}

	setAdapter(adapter = null)
	{
		if(adapter != null && typeof(adapter) != 'string')
		{
			this.#adapter = adapter;
			return this;
		}

		if(typeof(this.ccc.db[this.ccc.env]) == 'undefined')
		{
			throw "database is not set under envirnment '" + this.ccc.env + "'";
		}

		let adapterKey = null;

		if(typeof(adapter) == 'string')
		{
			adapterKey = adapter;
		}
		else
		{
			adapterKey = this.ccc.db[this.ccc.env].default;
		}

		if(typeof(this.ccc.adapter[adapterKey]) != 'undefined')
		{
			this.#adapter = this.ccc.adapter[adapterKey];
			return this;
		}

		if(typeof(this.ccc.db[this.ccc.env][adapterKey]) == 'undefined')
		{
			throw "database adapter key is not valid.";
		}

		this.#adapter = new Adapter();
		this.#adapter.setConfig(this.ccc.db[this.ccc.env][adapterKey]);
		this.ccc.adapter[adapterKey] = this.#adapter;
		
		return this;
	}
	
	getAdapter()
	{
		if(!this.#adapter)
		{
			this.setAdapter();
		}

		return this.#adapter;
	}

	createRow()
	{

		let object = this.objectManager(this.ccc.fn.className(this));
		object.setAdapter(this.getAdapter());
		return object;
	}

	fetchRow(query)
	{
		let row = this.createRow();
		row.#data = this.getAdapter().fetchRow(query);
		return row;
	}

	fetchAll(query)
	{
		let rows = this.getAdapter().fetchAll(query);

		if(!rows.length)
		{
			return [];
		}

		for (var i = rows.length - 1; i >= 0; i--) {
			let row = this.createRow();
			row.#data = rows[i];
			rows[i] = row;
		}
		
		return rows;
	}

	load(id, column = null, itSelf = false)
	{
		if(column == null)
		{
			column = this.#primaryKey;
		}

		let query = "SELECT * FROM `" + this.#tableName + "` WHERE `" + column + "` = '" + id + "';";
		let row = this;
		if(itSelf == false)
		{
			row = this.createRow();
		}

		row.#data = this.getAdapter().fetchRow(query);
		return row;
	}

	save()
	{
		let entityId = 0;

		if(typeof(this.#data[this.#primaryKey]) != 'undefined')
		{
			entityId  = this.ccc.cast.int(this.#data[this.#primaryKey]);
			delete this.#data[this.#primaryKey];
		}

		if(this.#data.length == 0)
		{
			throw "data is not set.";
		}

		if(entityId == 0)
		{
			this.beforeInsert();

			entityId = this.insert(this.#data);
			this.load(entityId, null, true);
			
			this.afterInsert();
		}
		else
		{
			this.beforeUpdate();

			let conditions = {};
			conditions[this.#primaryKey] = entityId;
			this.update(this.#data, conditions);
			this.load(entityId, null, true);

			this.afterUpdate();
		}

		return this;	
	}

	insert(data)
	{
		if(data.length == 0)
		{
			throw "data must have key-value pairs.";
		}

		let keys = Object.keys(data).map((v) => { return SqlString.escapeId(v, true);  }).join(',');
		let values = Object.values(data).map((v) => { return SqlString.escape(v, true);  }).join(',');
		let sql = "INSERT  INTO " + SqlString.escapeId(this.#tableName) + " (" + keys + ") VALUES (" + values +");";

		return this.getAdapter().insert(sql);		
	}

	update(data, conditions)
	{
		if(data.length == 0)
		{
			throw "data must have key-value pairs.";
		}

		if(conditions.length == 0)
		{
			throw "conditions must have key-value pairs.";
		}

		let params = [];
		for(let [column, value] of Object.entries(data))
		{
			params.push(SqlString.escapeId(column, true) + ' = ' + SqlString.escape(value, true)) ;
		}

		let where = [];
		for(let [column, value] of Object.entries(conditions))
		{
			where.push(SqlString.escapeId(column, true) + ' = ' + SqlString.escape(value, true));
		}

		let sql = 'UPDATE ' + SqlString.escapeId(this.#tableName) + ' SET ' + params.join(',') + ' WHERE ' + where.join(' AND ') + ';' ;

		return this.getAdapter().update(sql);
	}

	delete()
	{
		this.beforeDelete();

		let entityId = 0;
		if(typeof(this.#data[this.#primaryKey]) != 'undefined')
		{
			entityId  = this.ccc.cast.int(this.#data[this.#primaryKey]);
		}

		if(entityId == 0)
		{
			throw "nothing is set for delete";
		}

		let sql = 'DELETE FROM ' + SqlString.escapeId(this.#tableName) + ' WHERE ' + SqlString.escapeId(this.#primaryKey) + ' = ' + SqlString.escape(entityId) + ';';

		let result = this.getAdapter().delete(sql);
		this.#data = {};

		this.afterDelete();

		return result;
	}

	beforeInsert()
	{
		return this;
	}

	beforeUpdate()
	{
		return this;
	}

	beforeDelete()
	{
		return this;
	}

	afterInsert()
	{
		return this;
	}

	afterUpdate()
	{
		return this;
	}

	afterDelete()
	{
		return this;
	}
}

module.exports = Table;