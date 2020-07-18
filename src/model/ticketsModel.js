const pool = require('./pool');
function getTicketFromDb(data, callback) {
    console.log("Getting ticket: " + data.ticket_id + ", from user: " + data.user_id + " on the DB");
  
    const sql = "SELECT ticket_id, ticket_date, ticket_title, ticket_content, ticket_closed FROM tickets WHERE ticket_id = $1::int AND user_id = $2::int";
  
    const params = [data.ticket_id, data.user_id];
  
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
      console.log('Sending ticket info to client');
      callback(null, result.rows);
    })
  };
  
  function getTicketsByUserFromDb(user_id, callback) {
    console.log("Getting tickets from user: " + user_id + " from DB");
  
    const sql = "SELECT ticket_date, ticket_id, ticket_title, ticket_closed FROM tickets WHERE user_id = $1::int ORDER BY ticket_date desc";
    let params = [user_id];

    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        callback(err, null);
      } else {
        console.log('Sending tickets summary to client');
        callback(null, result.rows);
      }
    })
  };

  function insertTicketToDb(data, callback) {
    console.log("User " + data.user_id + " started the process to insert a new ticket on the DB");
  
    const sql = "INSERT INTO tickets (user_id, ticket_title, ticket_content) VALUES ($1, $2, $3)";
    
    const params = [data.user_id, data.ticket_title, data.ticket_content];
    
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      } else {
        let myArray = [{recordsInserted: result.rowCount}];
        console.log(myArray[0].recordsInserted + ' new ticket was inserted to the DB');
        callback(null, myArray);
      }
    })
  };

function removeTicketFromDb(data, callback) {
    console.log("Removing ticket from DB");
  
    const sql = "DELETE FROM tickets WHERE ticket_id = $1::int and user_id = $2::int";
  
    const params = [data.ticket_id, data.user_id];

    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        callback(err, null);
      } else {
        let myArray = [{recordsDeleted: result.rowCount}];
        console.log(myArray[0].recordsDeleted + ' records were deleted from the DB');
        callback(null, myArray);
      }

    })
  };

  function updateTicketFromDb (data, callback) {
    console.log("Updating ticket from DB");
  
    const sql = "UPDATE tickets SET ticket_closed = true WHERE ticket_id = $1::int AND user_id = $2::int";
  
    const params = [data.ticket_id, data.user_id];
  
    pool.query(sql, params, (err, result) => {
      if (err) {
        console.log("Error in query: ");
        callback(err, null);
      } else  {
        let myArray = [{recordsUpdated: result.rowCount}];
        console.log(myArray[0].recordsUpdated + ' records where updated on the DB');
        callback(null, myArray);
      }
  })
};

module.exports = {
    getTicketFromDb: getTicketFromDb,
    getTicketsByUserFromDb: getTicketsByUserFromDb,
    insertTicketToDb: insertTicketToDb,
    removeTicketFromDb: removeTicketFromDb,
    updateTicketFromDb: updateTicketFromDb
}
