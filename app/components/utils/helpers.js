var axios = require("axios");

var helper = {
  // get department
  getAllDepartments: function () {
    return axios.get("/getAllDepartments");
  },

  //
  getAllEmployees: function () {
    return axios.get("/getAllEmployees");
  },

  getCurrentUser: function () {
    return axios.get("/user");
  },

  // errorMessage: function() {
  //   return axios.get("/register");
  // },


  getEmployee: function (id) {
    return axios.get("/getEmployee/" + id);
  },

  getEmpSchedules: function () {
    return axios.get('/getEmpSchedules')
      .then(function (response) {
        return response;
      })
  },

  addEmpSchedule: function (emp_id, firstName, lastName, depart, phone, phoneCode) {
    return axios.post('/addEmpSchedule', {
      emp_id: emp_id,
      firstName: firstName,
      lastName: lastName,
      department: depart,
      phone: phone,
      phoneCode: phoneCode
    });
  },

  updateEmpSchedule: function (empSchedule) {
    return axios.put('/updateSchedule/' + empSchedule._id, {
      employeeSchedule: empSchedule
    });
  },

  addEmployee: function (firstName, lastName, email, phone, phoneCode, phoneType, password, department) {
    return axios.post("/addEmployee", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      phoneCode: phoneCode,
      phoneType: phoneType,
      password: password,
      department: department
    });
  },

  updateEmployee: function (id, firstName, lastName, email, phone, phoneCode, phoneType, password, department) {
    return axios.put("/updateEmployee/" + id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      phoneCode: phoneCode,
      phoneType: phoneType,
      password: password,
      department: department
    });
  },

  updateEmpName: function (emp_id, firstName, lastName, department, phone, phoneCode) {
    return axios.put("/updateEmpName/" + emp_id, {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      phoneCode: phoneCode
    });
  },

  removeEmployee: function (id) {
    return axios.put("/removeEmployee/" + id);
  },

  removeEmpSchedule: function (emp_id) {
    return axios.put("/removeEmpSchedule/" + emp_id);
  },

  getAnnouncements: function () {
    return axios.get("/getAnnouncements");
  },

  addAnnouncements: function (location, content) {
    return axios.post("/addAnnouncements", {
      location: location,
      content: content
    });
  }
};

module.exports = helper;
