var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    //department: ["Cleaning", "Catering"]
    department: {
        type: []
    }
});

var Department = mongoose.model('Department', departmentSchema);
module.exports = Department;