var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var http=require('http');
require('./lib/connection.js');
var employees = require('./routes/employees');
var teams = require('./routes/teams');
//var employeeService = require('./lib/employees');
//var responder = require('./lib/responseGenerator');
//var staticFile = responder.staticFile('/public');

var app = express();
// register middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// application routes
app.use(employees);
app.use(teams);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');

	err.status = 404;
	next(err);
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			message : err.message,
			error : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
});

module.exports = app;

/*
var server = http.createServer(function(req, res) {
	var _url;

	req.method = req.method.toUpperCase();
	console.log(req.method + ' ' + req.url);

	if (req.method !== 'GET') {
		res.writeHead(501, {
			'Content-Type' : 'text/plain'
		});
		return res.end(req.method + ' is not implemented by this server.');
	}

	if (_url = /^\/employees$/i.exec(req.url)) {
	    // return a list of employees
	    employeeService.getEmployees(function (error, data) {
	    	if (error) {
	    		// send a 500 error
	    		return responder.send500(error, res);
	    	}
	    	return responder.sendJson(data, res);
	    });
 	} else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
	    // find the employee by the id in the route
	    employeeService.getEmployee(_url[1], function(error, data) {
	    	if (error) {
	    		// send a 500 error
	    		return responder.send500(error, res);
	    	}

	    	if (!data) {
	    		// send a 404 error
	    		return responder.send404(res);
	    	}

	    	// send the data with a 200 status code
	    	return responder.sendJson(data, res);
	    });
  	} else {
	    // try to send the static file if it exists
	    // if not, send a 404
	    res.writeHead(200);
	    res.end('static file maybe');
  	}
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/