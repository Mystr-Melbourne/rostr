var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmployeeScheduleSchema = new Schema({
  emp_id: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  monday: {
    type: String,
    default: ""
  },
  monday_title: {
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
  tuesday_title: {
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
  wednesday_title: {
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
  thursday_title: {
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
  friday_title: {
    type: String,
    default: ""
  },
  friday_des: {
    type: String,
    default: ""
  },
  saturday:{
    type: String,
    default: ""
  },
  saturday_title: {
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
  sunday_title: {
    type: String,
    default: ""
  },
  sunday_des: {
    type: String,
    default: ""
  },
  department:{
    type: String,
    default: ""
  },
  active: {
    type: Number,
    default: 1,
  },
  monday_accept: {
    type: boolean,
    default: false
  },
  tuesday_accept: {
    type: boolean,
    default: false
  },
  wednesday_accept: {
    type: boolean,
    default: false
  },
  thursday_accept: {
    type: boolean,
    default: false
  },
  friday_accept: {
    type: boolean,
    default: false
  },
  saturday_accept: {
    type: boolean,
    default: false
  },
  sunday_accept: {
    type: boolean,
    default: false
  }
});

var EmployeeSchedule = mongoose.model('EmployeeSchedule', EmployeeScheduleSchema);
module.exports = EmployeeSchedule;