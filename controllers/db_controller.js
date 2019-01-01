  var express = require("express");
  var router = express.Router();
  var db = require("../db/db.js");
  var path = require("path");

  var employee = require("../models/employee");
  var EmployeeSchedule = require("../models/employeeSchedule");
  var announcements = require("../models/announcements");
  let Department = require("../models/department"); // add Department

  // Get department - read helpers.js
  router.get("/getAllDepartments", function(req,res) {
    Department.create({department: ["Cleaning", "Catering", "Event Management"]}, function(err,doc){
      if(err) {
        console.log(err);
      } else {
        res.send(doc); // send docs so font-end can read.
      }
    })
  });

  //Getting Employees from the database
  router.get("/getAllEmployees", function(req, res) {
    employee.find({ "active": 1 }).exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
  });

//Get employee schedules from database
  router.get("/getEmpSchedules", function(req, res) {
    EmployeeSchedule.find({ "active": 1 }).exec(function(err,docs) {
      if (err) {
        console.log(err);
        res.send(err);
      }
      else {
        res.send(docs);
      }
    });
  });

//Posting Employee Schedule to the database
  router.post("/addEmpSchedule", function(req, res) {
    EmployeeSchedule.create({
      emp_id: req.body.emp_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      phone: req.body.phone,
      phoneCode: req.body.phoneCode

    }, function(err) {
      if (err) {
        console.log(err);
      }
      else {
        res.send("Employee Schedule Saved!");
      }
    });
  });

//Updating existing employee schedule
  router.put("/updateSchedule/:id", function(req, res) {
    var newSchedule = req.body.employeeSchedule;
    EmployeeSchedule.findOneAndUpdate({ "_id": req.params.id }, {
        phone: newSchedule.phone,

        monday: newSchedule.monday,
        monday_location: newSchedule.monday_location,
        monday_des: newSchedule.monday_des,
        monday_accept: newSchedule.monday_accept,

        tuesday: newSchedule.tuesday,
        tuesday_location: newSchedule.tuesday_location,
        tuesday_des: newSchedule.tuesday_des,
        tuesday_accept: newSchedule.tuesday_accept,

        wednesday: newSchedule.wednesday,
        wednesday_location: newSchedule.wednesday_location,
        wednesday_des: newSchedule.wednesday_des,
        wednesday_accept: newSchedule.wednesday_accept,

        thursday: newSchedule.thursday,
        thursday_location: newSchedule.thursday_location,
        thursday_des: newSchedule.thursday_des,
        thursday_accept: newSchedule.thursday_accept,

        friday: newSchedule.friday,
        friday_location: newSchedule.friday_location,
        friday_des: newSchedule.friday_des,
        friday_accept: newSchedule.friday_accept,

        saturday: newSchedule.saturday,
        saturday_location: newSchedule.saturday_location,
        saturday_des: newSchedule.saturday_des,
        saturday_accept: newSchedule.saturday_accept,

        sunday: newSchedule.sunday,
        sunday_location: newSchedule.sunday_location,
        sunday_des: newSchedule.sunday_des,
        sunday_accept: newSchedule.sunday_accept,
        
        department: newSchedule.department
    }, function(err) {
       if (err) {
           console.log(err);
       } else {
           res.send("Employee schedule updated");
       }
    });
  });

//Posting new Employee to the database
  router.post("/addEmployee", function(req, res) {
    employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      phoneCode: req.body.phoneCode,

      phoneType: req.body.phoneType,
      password: req.body.password,
      department: req.body.department
    }, function(err,doc) {
      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
  });

//Updating existing employee
  router.put("/updateEmployee/:id", function(req, res) {
     employee.findOneAndUpdate({ "_id": req.params.id }, {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         phone: req.body.phone,
         phoneCode: req.body.phoneCode,

         phoneType: req.body.phoneType,
         password: req.body.password,
         department: req.body.department
     }, function(err) {
         if (err) {
             console.log(err);
         } else {
             res.send("Employee updated");
         }
     });
  });

// Update employee's name in employee schedule collection
  router.put("/updateEmpName/:emp_id", function(req, res) {
    EmployeeSchedule.findOneAndUpdate({"emp_id":req.params.emp_id}, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      phoneCode: req.body.phoneCode,
    }, function(err) {
       if (err) {
           console.log(err);
       } else {
           res.send("Employee's name updated");
       }
     });
  });

// "Remove" existing employee
  router.put("/removeEmployee/:id", function(req, res) {
     employee.findOneAndUpdate({ "_id": req.params.id }, { "active": 0 })
     .exec(function(err, doc) {
         if (err) {
             console.log(err);
         } else {
            res.send(doc);
         }
     })
  });

// "Remove" existing employee schedule
  router.put("/removeEmpSchedule/:emp_id", function(req, res) {
     EmployeeSchedule.findOneAndUpdate({ "emp_id": req.params.emp_id }, { "active": 0 })
     .exec(function(err, doc) {
         if (err) {
             console.log(err);
         } else {
             res.send(doc);
         }
     })
  });

//Getting announcements from the database
    router.get("/getAnnouncements", function(req, res) {
      announcements.find({ "active": 1 }).exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    });

//Put announcements to database
    router.post("/addAnnouncements", function(req, res) {
      announcements.create({
        location: req.body.location,
        content: req.body.content
      }, function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    });

module.exports = router;
