var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'smarte',
    password: 'smarte',
    database : 'smarte'
});


connection.connect();
connection.query('select * from security_stuff', 
                 function(err, rows, fields){
    if(!err)
        {
            console.log('Data from database: is:', rows);
        }
    else {
        console.log('Error while performing query');
        console.log(err);
    }
    
});
connection.end();


/*

var mysql = require('mysql');

var pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
  supportBigNumbers: true
});

// Get records from a city
exports.getRecords = function(city, callback) {
  var sql = "SELECT name FROM users WHERE city=?";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [city], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

*/