const usersModel = require('../model/usersModel');

function addUser(req, res) {
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_password = req.body.password;
    let company_id = req.body.companyNo;
    const obj = { user_name: user_name, user_email: user_email, user_password: user_password, company_id:company_id };

    usersModel.insertUserToDb(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function deleteUser(req, res) {
    let id = Number(req.body.id);
    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid positive number and greater than zero" });
    } else {
        usersModel.removeUserFromDb(id, (error, result) => {
            if (error || result == null) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getCompanyUsers(req, res) {
    let id = Number(req.params.companyNo)
    console.log(id);
    usersModel.getCompanyUsersFromDb(id, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function getUser (req, res){
    let id = Number(req.params.id) || Number(req.query.id);

    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid number and greater than zero" });
    } else {
        usersModel.getUserFromDb(id, (error, result) => {
            if (error || result == null || result.length < 1) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function updateUser(req, res) {
    let user_id = req.body.id;
    let user_name = req.body.name;
    let user_email = req.body.email;
    let user_password = req.body.password;
    const obj = { user_id: user_id, user_name: user_name, user_email: user_email, user_password: user_password };

    usersModel.updateUserFromDB(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    getCompanyUsers: getCompanyUsers,
    getUser: getUser,
    updateUser: updateUser
}