const React = require('react');
const ReactDOM = require('react-dom');
const Jsx = require('react-jsx');
const Path = require('path');
const fs = require('fs');

class Abstract extends React.Component
{
	ccc = null;
	#template = null;
	#children = {};
	#layout = null;
	//#blockProp = 'block-abstract';

	setLayout(layout)
	{
		this.#layout = layout;
		return this;
	}

	getLayout()
	{
		return this.#layout;
	}

	objectManager(className)
	{
		let object = new (this.ccc.load.class(className))();
		object.ccc = this.ccc;
		object.setLayout(this.getLayout());
		return object;
	}

	renderLayout()
	{
		var template = fs.readFileSync(this.getTemplateFullPath(), 'utf-8');
		let server = Jsx.server(template, {raw : true});
		let html = server({self : this},{html : true});
		return html;
	}

	toHtml()
	{
		var template = fs.readFileSync(this.getTemplateFullPath(), 'utf-8');
		let server = Jsx.server(template, {raw : true});
		let html = server({self : this},{html : false});
		return html;
	}

	render()
	{
    	return this.toHtml();
  	}

	getTemplateFullPath()
	{
		return process.cwd() + Path.sep + 'app' + Path.sep + 'modules' + Path.sep + this.getTemplate();
	}

	setTemplate(template)
	{
		this.#template = template;
		return this;
	}

	getTemplate()
	{
		return this.#template;
	}

	createChild(className)
	{
		return this.objectManager(className);
	}

	addChild(key, object)
	{
		this.#children[key] = object;
		return this;
	}

	getChild(key)
	{
		if(typeof this.#children[key] == 'object')
		{
			return this.#children[key];	
		}
		console.log('"' + key + '" block key is not available in ' + __dirname);
		return null;
	}

	getChildHtml(key)
	{
		let child = this.getChild(key);
		if(child == null)
		{
			return null;
		}
		return child.render();
	}

	getChildren()
	{
		return this.#children;
	}
}

module.exports = Abstract;