var employeeDb = require('../database/employees');
var array = require('array.prototype.find');

function getEmployees(callback) {
	setTimeout(function() {
		callback(null, employeeDb);
	}, 500);
}

function getEmployee(employeeId, callback) {
	getEmployees(function(error, data) {
		if (error) {
			return callback(error);
		}

		// return employee object
		var result = data.find(function (item) {
			return item.id === employeeId;
		});
		callback(null, result);
	});
}

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;