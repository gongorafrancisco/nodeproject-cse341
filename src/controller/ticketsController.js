const ticketsModel = require('../model/ticketsModel');

function addTicket(req, res){
    let user_id = req.body.userNo;
    let ticket_title = req.body.title;
    let ticket_content = req.body.content;
    const obj = { user_id: user_id, ticket_title: ticket_title, ticket_content: ticket_content };

    ticketsModel.insertTicketToDb(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function deleteTicket(req, res){
    let id = Number(req.body.id);
    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid positive number and greater than zero" });
    } else {
        ticketsModel.removeTicketFromDb(id, (error, result) => {
            if (error || result == null) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getTicket(req, res){
    let id = Number(req.params.id) || Number(req.query.id);

    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid number and greater than zero" });
    } else {
        ticketsModel.getTicketFromDb(id, (error, result) => {
            if (error || result == null || result.length < 1) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getTicketByUser(req, res){
    let id = Number(req.params.id)
    console.log(id);
    ticketsModel.getTicketsByUserFromDb(id, (error, result) => {
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
    getTicketByUser: getTicketByUser
};