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
        .get(verifyLogin, usersController.getUser);
    app.route('/users/company/:companyNo')
        .get(usersController.getCompanyUsers);
    app.route('/users/add/')
        .post(usersController.addUser);
    app.route('/users/update/')
        .put(usersController.updateUser);
    app.route('/users/delete')
        .delete(usersController.deleteUser);
 
    app.route('/tickets/add')
        .post(verifyLogin, ticketsController.addTicket);
    app.route('/tickets/user')
        .get(verifyLogin, ticketsController.getTicketByUser);
    app.route('/tickets/:ticket_id')
        .get(verifyLogin, ticketsController.getTicket);
    app.route('/tickets/delete')
        .delete(verifyLogin, ticketsController.deleteTicket);
    app.route('/tickets/update')
        .put(verifyLogin, ticketsController.updateTicket);
}

function verifyLogin(req, res, next) {
	if (req.session.userID) {
		next();
	} else {
        res.redirect('/');
	}
}
module.exports = routes;