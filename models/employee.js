var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    phoneType: {
        type: String
    },
    password: {
        type: String
    },
    department: {
        type: String
    },
    active: {
        type: Number,
        default: 1
    }
});

var Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;