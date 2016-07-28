module.exports = function(io){
    var express = require('express');
    var router = express.Router();
    
    /* GET home page. */
    var data = require("../data.json");

    io.on('connection', function(socket){
      console.log('a user connected');
    });

    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Securie', data: data });
    });
    
    /* REST methods */
    router.post('/update', function(req, res) {
        var update_data = req.body;
        res.writeHead(200, {'Content-Type': 'text/html'}); // Send OK
        io.emit('update_zone', update_data);
        res.end();
    });
    
    /** 
        Handle REST post message for new message 
        Upon recieving a new message data app should update DB
    */
    router.post('/message', function(req, res) {
        var msg_data = req.body;
        /* Message structure
            {
                "from" : "SEC 1",
                "message": "Message body text here. ",
                "datetime": "27-07-2016"
            }
        */
        // update_db_msg(msg_data)
        res.writeHead(200, {'Content-Type': 'text/html'}); // Send OK
        io.emit('update_msg', msg_data);
        res.end();
    });
    
    return router;
}