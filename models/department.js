var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    // this holds the department type e.g. department: ["Cleaning", "Catering"]
    department: {
        type: []
    }
});

var Department = mongoose.model('Department', departmentSchema);
module.exports = Department;