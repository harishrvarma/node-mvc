
const Admin = require('./../../Core/Controller/Admin');

module.exports = class Login extends Admin
{
	constructor()
	{
		super();
	}

	loginAction()
	{
		let html = "<form action='http://localhost:3001/admin/login-post' method='post'><input type='text' name='login[username]'> <input type='text' name='login[password]'> <input type='submit' name='doLogin' value='Login'></form>";
		this.response.send(html);
	}

	loginPostAction()
	{
		this.sendJson(this.request.body);
	}
}