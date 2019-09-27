const SyncMysql = require('sync-mysql');

module.exports = class Adapter
{
	namespace = 'Core/Model/Db';
	connect = null;
	config = {
		host: null,
		user: null,
		port: 3306,
		password: null,
		database: null
	};

	setConfig(config)
	{
		if(typeof(config) == 'object')
		{
			Object.assign(this.config, config)
		}
		return this;
	}

	doConnect()
	{
		this.connect = new SyncMysql(this.config);
		return this;
	}

	query(query)
	{
		if(!query)
		{
			throw "Query should not be empty.";
		}

		if(this.connect == null)
		{
			this.doConnect();
		}

		return this.connect.query(query);
	}

	fetchAll(query)
	{
		return this.query(query);
	}

	fetchPairs(query)
	{
		let rows = {};
		let data = this.query(query);
		for (var i = 0; i < data.length ; i++) 
		{
			let row = Object.values(data[i]);
			if(typeof(row[0]) != 'undefined' && typeof(row[1]) != 'undefined')
			{
				rows[row[0]] = row[1];
			}
		}
		return rows;
	}

	fetchRow(query)
	{
		let data = this.query(query);
		if (typeof(data[0]) == 'undefined')
		{
			return {};
		}
		return data[0];
	}

	fetchOne(query)
	{
		let data = this.query(query);
		if (typeof(data[0]) == 'undefined')
		{
			return null;
		}

		data = Object.values(data[0]);
		return data[0];
	}

	update(query)
	{
		var result = this.query(query);

		if(result.affectedRows >= 0)
		{
			return true;
		}
		return false;
	}

	delete(query)
	{
		var result = this.query(query);

		if(result.affectedRows >= 0)
		{
			return true;
		}
		return false;
	}

	insert(query)
	{
		var result = this.query(query);

		if(result.insertId > 0)
		{
			return result.insertId;
		}
		return false;
	}
}