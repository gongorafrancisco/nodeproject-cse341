const usersModel = require('../model/usersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function handleLogin(req, res) {
    const user_email = req.body.email;
    const user_password = req.body.password;
    const obj = { user_email: user_email };

    usersModel.checkUserLoginDb(obj, (error, result) => {
        if (error || result == null || result.length < 1) {
            res.redirect('/');
        } else {
            if (bcrypt.compareSync(user_password, result[0].user_password)){
                console.log('Password for user ' + result[0].user_id + 'matches');
                console.log('User with user_id: ' + result[0].user_id + ' is now logged in');
                req.session.userID = result[0].user_id;
                res.redirect('/dashboard');
            }
            else {
                console.log('Password for user ' + result[0].user_id + 'don\'nt match');
                console.log('Redirecting user to login page');
                res.redirect('/');
            }
        }
    })
}

function handleLogout(req, res) {
    const user_id = req.session.userID;
        if (req.session.userID) {
            console.log('User with user_id: ' + user_id + ', started the logout process');
            req.session.destroy();
        }
        console.log('User with user_id: ' +  user_id +  ', was successfully logged out');
        res.redirect('/');

}

function addUser(req, res) {
    const user_name = req.body.name;
    const user_email = req.body.email;
    const user_password = req.body.password;
    const company_id = req.body.companyNo;

    //Salt and hash the password with BCrypt
    const hash = bcrypt.hashSync(user_password, saltRounds);

    const obj = { user_name: user_name, user_email: user_email, user_password: hash, company_id:company_id };

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
    usersModel.getCompanyUsersFromDb(id, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function getUser (req, res){
    let id = req.session.userID;

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
    updateUser: updateUser,
    handleLogin: handleLogin,
    handleLogout: handleLogout
}