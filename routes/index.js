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
    
    return router;
}
