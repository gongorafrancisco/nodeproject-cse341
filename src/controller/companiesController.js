const companiesModel = require('../model/companiesModel');

function addCompany(req, res) {
    let name = req.body.name;
    let code = req.body.code;
    const obj = { company_name: name, company_spcode: code };

    companiesModel.insertCompanyToDb(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function deleteCompany(req, res) {
    let id = Number(req.body.companyNo);
    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid positive number and greater than zero" });
    } else {
        companiesModel.removeCompanyFromDb(id, (error, result) => {
            if (error || result == null) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function getCompanies(req, res) {

    companiesModel.getCompaniesFromDB((error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

function getCompany(req, res) {
    let id = Number(req.params.id) || Number(req.query.id);

    if (id < 1 || Number.isNaN(id)) {
        res.status(500).json({ success: false, data: "ID must be a valid number and greater than zero" });
    } else {
        companiesModel.getCompanyFromDB(id, (error, result) => {
            if (error || result == null || result.length < 1) {
                res.status(500).json({ success: false, data: error });
            } else {
                res.status(200).json(result);
            }
        });
    }
};

function updateCompanyCode(req, res) {
    let companyNo = req.body.companyNo;
    let code = req.body.code;
    const obj = { company_id: companyNo, company_spcode: code };

    companiesModel.updateCompanyFromDB(obj, (error, result) => {
        if (error || result == null) {
            res.status(500).json({ success: false, data: error });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = {
    addCompany: addCompany,
    deleteCompany: deleteCompany,
    getCompanies: getCompanies,
    getCompany: getCompany,
    updateCompanyCode: updateCompanyCode
};