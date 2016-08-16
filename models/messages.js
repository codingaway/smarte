var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'smarte',
    password: 'smarte',
    database: 'smarte',
    connectionLimit: 10,
    supportBigNumbers: true
});

exports.getSecurityInfo = function (callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM security_stuff', function (err, rows) {
            // And done with the connection.
            connection.release();

            if (!err) {
                callback(rows);
            } else {
                callback(null);
            }
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};

exports.updateMsg = function (msgData, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('INSERT INTO messages VALUES(?, ?, now());', [msgData.from, msgData.message], function (err, result) {
            // And done with the connection.
            connection.release();

            if (!err) {
                callback(result);
            } else {
                callback(null);
                console.log('ERROR: ' + err);
            }
            // Don't use the connection here, it has been returned to the pool.
        });
    });
};

/* Get top fiv message */
exports.get5Msgs = function (callback) {
    pool.getConnection(function (conErr, connection) {
        // Use the connection
//        queryString = 'SELECT security_stuff.fname, messages.message,\n\
//                messages.datetime FROM messages INNER join security_stuff on \n\
//                messages.sender = security_stuff.id\n\
//                ORDER by messages.datetime desc LIMIT 5';
        queryString = 'SELECT sender, message, datetime FROM messages ORDER by datetime desc LIMIT 5';
        connection.query(queryString, function (err, rows) {
            // And done with the connection.
            connection.release();

            if (!err) {
                callback(rows);
            } else {
                callback(null);
                console.log('DB ERROR: ' + err);
            }
        });
    });
};

/* Update zone info */
exports.update_zone = function(z_data, callback) {
    pool.getConnection(function (conErr, connection) {
        // Use the connection
        /*
         * Call stored procedure to update zone info
         * update_zone(p_zone_id, p_security_id, p_noise, p_temp, p_light, p_guest_id) 
         * 
         */
        var queryString = 'CALL update_zone(?, ?, ?, ?, ?, ?)';
        var params = [z_data.name, z_data.gname, z_data.noise, z_data.temp, z_data.light, z_data.count,];
        connection.query(queryString, params, function (err, result) {
            // And done with the connection.
            connection.release();

            if(!err) {
                //console.log("Update zone DB ops returns: " + result);
                callback(result);
            } else {
                console.log('DB ERROR: ' + err);
                callback(null);
            }
        });
    });
};

/* Get zone stats */
exports.getZoneStats = function(){
    // SQL: 'select zone_info.name as zone_name, count(*) from guest_map INNER JOIN zone_info ON guest_map.zone_id = zone_info.zone_code group by zone_id'
};
