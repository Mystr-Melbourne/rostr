var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EmployeeScheduleSchema = new Schema({
  emp_id: {
    type: String
  },
  phone: {
    type: String
  },
  phoneCode: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  department: {
    type: String,
    default: ""
  },
  active: {
    type: Number,
    default: 1
  },

  // needs refactoring
  monday: {
    type: String,
    default: ""
  },
  monday_location: {
    type: String,
    default: ""
  },
  monday_des: {
    type: String,
    default: ""
  },
  tuesday: {
    type: String,
    default: ""
  },
  tuesday_location: {
    type: String,
    default: ""
  },
  tuesday_des: {
    type: String,
    default: ""
  },
  wednesday: {
    type: String,
    default: ""
  },
  wednesday_location: {
    type: String,
    default: ""
  },
  wednesday_des: {
    type: String,
    default: ""
  },
  thursday: {
    type: String,
    default: ""
  },
  thursday_location: {
    type: String,
    default: ""
  },
  thursday_des: {
    type: String,
    default: ""
  },
  friday: {
    type: String,
    default: ""
  },
  friday_location: {
    type: String,
    default: ""
  },
  friday_des: {
    type: String,
    default: ""
  },
  saturday: {
    type: String,
    default: ""
  },
  saturday_location: {
    type: String,
    default: ""
  },
  saturday_des: {
    type: String,
    default: ""
  },
  sunday: {
    type: String,
    default: ""
  },
  sunday_location: {
    type: String,
    default: ""
  },
  sunday_des: {
    type: String,
    default: ""
  },

  monday_accept: {
    type: Number,
    default: 0 // 0 is not accepted, 1 accepted, 2 declined.
  },
  tuesday_accept: {
    type: Number,
    default: 0
  },
  wednesday_accept: {
    type: Number,
    default: 0
  },
  thursday_accept: {
    type: Number,
    default: 0
  },
  friday_accept: {
    type: Number,
    default: 0
  },
  saturday_accept: {
    type: Number,
    default: 0
  },
  sunday_accept: {
    type: Number,
    default: 0
  },

  monday_clockin: {
    type: Date,
    default: Date.now 
  },
  monday_clockout: {
    type: Date,
    default: Date.now 
  },
  tuesday_clockin: {
    type: Date,
    default: Date.now 
  },
  tuesday_clockout: {
    type: Date,
    default: Date.now 
  },
  wednesday_clockin: {
    type: Date,
    default: Date.now 
  },
  wednesday_clockout: {
    type: Date,
    default: Date.now 
  },
  thursday_clockin: {
    type: Date,
    default: Date.now 
  },
  thursday_clockout: {
    type: Date,
    default: Date.now 
  },
  friday_clockin: {
    type: Date,
    default: Date.now 
  },
  friday_clockout: {
    type: Date,
    default: Date.now 
  },
  saturday_clockin: {
    type: Date,
    default: Date.now 
  },
  saturday_clockout: {
    type: Date,
    default: Date.now 
  },
  sunday_clockin: {
    type: Date,
    default: Date.now 
  },
  sunday_clockout: {
    type: Date,
    default: Date.now 
  },

  monday_authCode: {
    type: String,
    default: "" // stores unique auth token for each shift
  },
  tuesday_authCode: {
    type: String,
    default: "" 
  },
  wednesday_authCode: {
    type: String,
    default: ""
  },
  thursday_authCode: {
    type: String,
    default: ""
  },
  friday_authCode: {
    type: String,
    default: ""
  },
  saturday_authCode: {
    type: String,
    default: ""
  },
  sunday_authCode: {
    type: String,
    default: ""
  }

});

var EmployeeSchedule = mongoose.model(
  "EmployeeSchedule",
  EmployeeScheduleSchema
);
module.exports = EmployeeSchedule;
