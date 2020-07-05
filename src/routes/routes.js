const companiesController = require('../controller/companiesController');
const usersController = require('../controller/usersController');
const ticketsController = require('../controller/ticketsController');

const routes = (app) => {
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

    app.route('/users/:id')
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
    app.route('/tickets/user/:id')
        .get(ticketsController.getTicketByUser);
}

module.exports = routes;