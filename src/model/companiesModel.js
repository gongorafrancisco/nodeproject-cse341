const pool = require('./pool');

function getCompaniesFromDB (callback) {
    console.log("Getting person from DB");
  
    const sql = "SELECT * FROM companies";
  
    pool.query(sql, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
      console.log(result.rows);
      callback(null, result.rows);
    })
  };

function getCompanyFromDB(id, callback) {
    console.log("Getting company from DB");
  
    const sql = "SELECT * FROM companies WHERE company_id = $1::int";
  
    const params = [id];
  
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
      console.log(result.rows);
      callback(null, result.rows);
    })
  };

function insertCompanyToDb(data, callback) {
    console.log("Inserting company to DB");
  
    const sql = "INSERT INTO companies (company_name, company_spcode) VALUES ($1, $2)";
    
    const params = [data.company_name, data.company_spcode];
    
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      } else {
        let myArray = [{recordsInserted: result.rowCount}];
        console.log(myArray);
        callback(null, myArray);
      }
    })
  };

function removeCompanyFromDb(id, callback) {
    console.log("Removing company from DB");
  
    const sql = "DELETE FROM companies WHERE company_id = $1::int";
  
    const params = [id];

    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      } else {
        let myArray = [{recordsDeleted: result.rowCount}];
        console.log(myArray);
        callback(null, myArray);
      }

    })
  }

function updateCompanyFromDB(data, callback) {
    console.log("Updating company support code");
  
    const sql = "UPDATE companies SET company_spcode = $2 WHERE company_id = $1";
  
    const params = [data.company_id, data.company_spcode];
  
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      } else  {
        let myArray = [{recordsUpdated: result.rowCount}];
        console.log(myArray);
        callback(null, myArray);
      }
  })
};

module.exports = {
    getCompaniesFromDB: getCompaniesFromDB,
    getCompanyFromDB: getCompanyFromDB,
    insertCompanyToDb: insertCompanyToDb,
    removeCompanyFromDb: removeCompanyFromDb,
    updateCompanyFromDB: updateCompanyFromDB
};
