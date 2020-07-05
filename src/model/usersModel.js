const pool = require('./pool');
function getCompanyUsersFromDb (id, callback) {
    console.log("Getting users from DB");
  
    const sql = "SELECT u.user_id, u.user_name, u.user_email, c.company_name  FROM users AS u LEFT JOIN companies AS c ON u.company_id=c.company_id WHERE c.company_id = $1::int";
    let params = [id];

    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      } else {
        console.log(result.rows);
        callback(null, result.rows);
      }
    })
  };

  function getUserFromDb( id, callback) {
    console.log("Getting user from DB");
  
    const sql = "SELECT u.user_id, u.user_name, u.user_email, c.company_name  FROM users AS u LEFT JOIN companies AS c ON u.company_id=c.company_id WHERE u.user_id = $1::int";
  
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

  function insertUserToDb(data, callback)  {
    console.log("Inserting user to DB");
  
    const sql = "INSERT INTO users (user_name, user_email, user_password, company_id) VALUES ($1, $2, $3, $4)";
    
    const params = [data.user_name, data.user_email, data.user_password, data.company_id];
    
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

  function removeUserFromDb(id, callback) {
    console.log("Removing user from DB");
  
    const sql = "DELETE FROM users WHERE user_id = $1::int";
  
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

  function updateUserFromDB (data, callback) {
    console.log("Updating user from DB");
  
    const sql = "UPDATE users SET user_name = $2, user_email = $3, user_password = $4 WHERE user_id = $1";
  
    const params = [data.user_id, data.user_name, data.user_email, data.user_password];
  
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
    getCompanyUsersFromDb: getCompanyUsersFromDb,
    getUserFromDb: getUserFromDb,
    insertUserToDb: insertUserToDb,
    removeUserFromDb: removeUserFromDb,
    updateUserFromDB: updateUserFromDB
}