module.exports = function (io) {
    var express = require('express');
    var router = express.Router();

    /* GET home page. */
    var data = require("../data.json"); /* JSON file containing data */
    var db = require("../models/messages");

    io.on('connection', function (socket) {
        console.log('a user connected');
    });

    router.get('/', function (req, res, next) {
        res.render('index', {title: 'Securie', data: data});
    });

    /* REST methods */
    router.post('/update', function (req, res) {
        var update_data = req.body;
        
        db.update_zone(update_data, function (result) {
            if (result) {
                // Read new data from DB and update the UI
                io.emit('update_zone', update_data);
                db.getZoneStats(function(data){
                    if(data) {
                      //io.emit('update_zone', data);
                    }                
                });              
//                console.log('DB returns: ' + data);
                res.writeHead(200, {'Content-Type': 'text/html'}); // Send OK
            } else {
                res.writeHead(500, {'Content-Type': 'text/html'}); // Send Internal Server Error
                
            }
            res.end();
        });
    });

    /** 
     Handle REST post message for new message 
     Upon recieving a new message data app should update DB
     */
    router.post('/message', function (req, res) {
        var msg_data = req.body;

        // update_db_msg(msg_data)
        db.updateMsg(msg_data, function (result) {
            console.log('A message saved at row: ' + result);
        });

        // Update messages UI
        db.get5Msgs(function (msgs) {
            if (msgs) {
                io.emit('update_msg', msgs);
            }
        });
        res.writeHead(200, {'Content-Type': 'text/html'}); // Send OK
        res.end();
    });

    return router;
};