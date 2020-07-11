const ticketsModel = require('../model/ticketsModel');

function addTicket(req, res){
    const user_id = req.session.userID;
    const ticket_title = req.body.title;
    const ticket_content = req.body.content;
    const obj = { user_id: user_id, ticket_title: ticket_title, ticket_content: ticket_content };

    ticketsModel.insertTicketToDb(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function updateTicket(req, res){
    const user_id = req.session.userID;
    const ticket_id = Number(req.body.ticket_id);

    if (ticket_id < 1 || Number.isNaN(ticket_id)) {
        res.status(500).json({ success: false, data: "Ticket ID must be a valid positive number and greater than zero" });
    } else {
        const obj = { user_id: user_id, ticket_id: ticket_id};
        ticketsModel.updateTicketFromDb(obj, (error, result) => {
            if (error || result == null) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function deleteTicket(req, res){
    const user_id = req.session.userID;
    const ticket_id = Number(req.body.ticket_id);

    if (ticket_id < 1 || Number.isNaN(ticket_id)) {
        res.status(500).json({ success: false, data: "Ticket ID must be a valid positive number and greater than zero" });
    } else {
        const obj = { user_id: user_id, ticket_id: ticket_id};
        ticketsModel.removeTicketFromDb(obj, (error, result) => {
            if (error || result == null) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getTicket(req, res){
    const user_id = req.session.userID;
    const ticket_id = Number(req.params.ticket_id) || Number(req.query.ticket_id);

    if (ticket_id < 1 || Number.isNaN(ticket_id)) {
        res.status(500).json({ success: false, data: "Ticket id must be a valid number and greater than zero" });
    } else {
        const obj = { user_id: user_id, ticket_id: ticket_id };
        ticketsModel.getTicketFromDb(obj, (error, result) => {
            if (error || result == null || result.length < 1) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getTicketByUser(req, res){
    let user_id = req.session.userID;
    ticketsModel.getTicketsByUserFromDb(user_id, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = {
    addTicket: addTicket,
    deleteTicket: deleteTicket,
    getTicket: getTicket,
    getTicketByUser: getTicketByUser,
    updateTicket: updateTicket
};