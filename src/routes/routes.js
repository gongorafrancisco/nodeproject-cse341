const companiesController = require('../controller/companiesController');
const usersController = require('../controller/usersController');
const ticketsController = require('../controller/ticketsController');

const routes = (app) => {
    app.route('/login')
        .post(usersController.handleLogin);
    app.route('/logout')
        .get(usersController.handleLogout);

    app.route('/companies')
        .get(companiesController.getCompanies);
    app.route('/companies/:id')
        .get(companiesController.getCompany);
    app.route('/companies/add/')
        .post(companiesController.addCompany);
    app.route('/companies/update/')
        .put(companiesController.updateCompanyCode);
    app.route('/companies/delete/')
        .delete(companiesController.deleteCompany);

    app.route('/users')
        .get(usersController.getUser);
    app.route('/users/company/:companyNo')
        .get(usersController.getCompanyUsers);
    app.route('/users/add/')
        .post(usersController.addUser);
    app.route('/users/update/')
        .put(usersController.updateUser);
    app.route('/users/delete')
        .delete(usersController.deleteUser);
 
    app.route('/tickets/add')
        .post(ticketsController.addTicket);
    app.route('/tickets/user')
        .get(ticketsController.getTicketByUser);
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.userID) {
		// They are logged in!
		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}
module.exports = routes;