const pool = require('./pool');
function getTicketFromDb(id, callback) {
    console.log("Getting ticket from DB");
  
    const sql = "SELECT u.ticket_id, u.ticket_name, u.ticket_email, c.company_name  FROM tickets AS u LEFT JOIN companies AS c ON u.company_id=c.company_id WHERE u.ticket_id = $1::int";
  
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
  
  function getTicketsByUserFromDb(id, callback) {
    console.log("Getting tickets by user from DB");
  
    const sql = "SELECT ticket_date, ticket_id, ticket_title FROM tickets WHERE user_id = $1::int";
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

  function insertTicketToDb(data, callback) {
    console.log("Inserting ticket to DB");
  
    const sql = "INSERT INTO tickets (user_id, ticket_title, ticket_content) VALUES ($1, $2, $3)";
    
    const params = [data.user_id, data.ticket_title, data.ticket_content];
    
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

  function removeticketFromDb(id, callback) {
    console.log("Removing ticket from DB");
  
    const sql = "DELETE FROM tickets WHERE ticket_id = $1::int";
  
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
  };

  function updateticketFromDb (data, callback) {
    console.log("Updating ticket from DB");
  
    const sql = "UPDATE tickets SET ticket_name = $2, ticket_email = $3, ticket_password = $4 WHERE ticket_id = $1";
  
    const params = [data.ticket_id, data.ticket_name, data.ticket_email, data.ticket_password];
  
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
    getTicketFromDb: getTicketFromDb,
    getTicketsByUserFromDb: getTicketsByUserFromDb,
    insertTicketToDb: insertTicketToDb,
    removeticketFromDb: removeticketFromDb,
    updateticketFromDb: updateticketFromDb
}
