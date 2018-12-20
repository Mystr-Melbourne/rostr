var React = require("react");
var helpers = require("../utils/helpers");
var phone = require('phone');

var ManagerEmployeeAll = React.createClass({
    getInitialState: function() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phoneNum: "",
            phoneType: "",
            password: "",
            allEmployees: [],
            selectedEmployee: "",
            emp_id: "",
            department: "",
            departments: [],
            empSchedules: []
        };
    },

    componentDidMount: function() {
        this.getEmployees();
        this.getAllDepartments();
        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
              this.setState({ empSchedules: response.data });
            }
        }.bind(this));
    },

    getAllDepartments: function() {
        helpers.getAllDepartments().then(function(response){
            this.setState({
                departments: response.data.department
            });
        }.bind(this));
    },

    getEmployees: function() {
        helpers.getAllEmployees().then(function(response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
                this.activeButtons();
            }
        }.bind(this));
    },

    handleUserChange(event) {
       this.setState({ [event.target.name]: event.target.value});
    },

    handleAddForm: function(event) {
        event.preventDefault();
        helpers.addEmployee(this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNum, this.state.phoneType, this.state.password, this.state.department).then(function(response) {
            this.state.emp_id = response.data._id;

            helpers.addEmpSchedule(this.state.emp_id, this.state.firstName, this.state.lastName, this.state.department).then(function(response) {
                this.clearStates();
            }.bind(this));

        }.bind(this));
        Materialize.toast('Employee added', 3000);
        this.clearForm();
        this.getEmployees();
    },

    handleUpdateForm: function(event) {
        event.preventDefault();
        helpers.updateEmployee(this.state.selectedEmployee, this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNum, this.state.phoneType, this.state.password, this.state.department).then(function(response) {
        }.bind(this));

        helpers.updateEmpName(this.state.emp_id, this.state.firstName, this.state.lastName, this.state.department).then(function(response) {
            this.clearStates();
        }.bind(this));

        this.state.empSchedules.map((person, i) => {
            if(person.emp_id == this.state.selectedEmployee) {
                person.department = this.state.department;
                helpers.updateEmpSchedule(person).then(function(response) {
                    var empName = person.firstName + " " + person.lastName + "'s ";
                    Materialize.toast(empName + "schedule updated", 2000);
                }.bind(this));;
            }
        })
        Materialize.toast("Employee updated", 3000);
        this.clearForm();
        this.getEmployees();
   },

    handleRemoveForm: function(event) {
        event.preventDefault();
        helpers.removeEmployee(this.state.selectedEmployee).then(function(response) {
        }.bind(this));
        helpers.removeEmpSchedule(this.state.emp_id).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast("Employee removed", 3000);
        this.clearForm();
        this.getEmployees();
    },

    clickEmployee: function(event) {
        this.setState({selectedEmployee: event.target.id}, function() {
            for (var i = 0; i < this.state.allEmployees.length; i++) {
                if (this.state.allEmployees[i]._id == this.state.selectedEmployee) {
                    this.setState({
                        firstName: this.state.allEmployees[i].firstName,
                        lastName: this.state.allEmployees[i].lastName,
                        email: this.state.allEmployees[i].email,
                        phoneNum: this.state.allEmployees[i].phoneNum,
                        phoneType: this.state.allEmployees[i].phoneType,
                        password: this.state.allEmployees[i].password,
                        emp_id: this.state.selectedEmployee,
                        department: this.state.allEmployees[i].department
                    });
                    this.activeButtons();
                }
            }
        });
    },

    newEmployee: function() {
        this.clearForm();
        this.clearStates();
        this.activeButtons();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            if ((elements[i].type == "text") || (elements[i].type == "number") || (elements[i].type == "email")) {
                elements[i].value = "";
                elements[i].classList.remove("valid");
            }
        };
        this.getEmployees();
    },

    clearStates: function() {
        this.setState({ firstName: "", lastName: "", email: "", phoneNum: "", phoneType: "", password: "", selectedEmployee: "", department: ""});
    },

    activeButtons: function() {
        // don't allow updating or removing on empty form
        if (this.state.selectedEmployee == "") {
            document.getElementById("addEmployee").className = "btn btn-large waves-effect waves-light green accent-3";
            document.getElementById("updateEmployee").className += " disabled";
            document.getElementById("removeEmployee").className += " disabled";
        } else {
            document.getElementById("addEmployee").className += " disabled";
            document.getElementById("updateEmployee").className = "btn btn-large waves-effect waves-light blue accent-3";
            document.getElementById("removeEmployee").className = "btn btn-large waves-effect waves-light red accent-3";
        }
    },

    phoneValidation: function() {
        const country = 'AUS';

        var tempPhone = phone(this.state.phoneNum.replace(/ +/g, ""), country);
        console.log(tempPhone);

        if (tempPhone.length === 2) {
            return true;
        } else {
            return false;
        }
    },

    render: function() {
        return (
            <div className="row">
                <div className="col m3">
                    <table className="highlight" id="allEmployees">
                        <thead>
                            <tr>
                                <th data-field="name">Employees</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="newEmployee" onClick={this.newEmployee}>
                                    <strong>New Employee<i className="material-icons right">add</i></strong>
                                </td>
                            </tr>
                            {this.state.allEmployees.map(function(ManagerEmployeeAll, i) {
                                return (
                                    <tr key={i}>
                                        <td onClick={this.clickEmployee} id={this.state.allEmployees[i]._id}>
                                            {ManagerEmployeeAll.firstName} {ManagerEmployeeAll.lastName}
                                        </td>
                                    </tr>
                                );
                            }, this)}
                        </tbody>
                    </table>
                </div>
                <div className="col m9">
                    <div className="row">
                        <form className="col m12" onSubmit={this.handleAddForm}>
                            <div className="row">
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        type="text"
                                        className="validate"
                                        value={this.state.firstName}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m6 s12">
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        type="text"
                                        className="validate"
                                        value={this.state.lastName}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        value={this.state.email}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m12 s12">
                                    <input
                                        placeholder="password"
                                        name="password"
                                        type="password"
                                        className="validate"
                                        value={this.state.password}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m8 s8">
                                    <input
                                        placeholder="Phone"
                                        name="phoneNum"
                                        type="tel"
                                        className="validate"
                                        value={this.state.phoneNum}
                                        onChange={this.handleUserChange}
                                        required />
                                </div>
                                <div className="input-field col m4 s4">
                                    <select className="browser-default" name="phoneType" value={this.state.phoneType} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Phone Type</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="work">Work</option>
                                        <option value="home">Home</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col m4 s4">
                                    <select className="browser-default" name="department" value={this.state.department} onChange={this.handleUserChange} required>
                                        <option value="" disabled>Department</option>
                                        {this.state.departments.map((each, i) => {
                                            return(<option key={i} value={each}>{each}</option>);
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s4">
                                    <button id="addEmployee" className="btn btn-large waves-effect waves-light green accent-3"
                                    type="submit" value="Submit" onClick={this.phoneValidation}>Add
                                        <i className="material-icons right">person_add</i>
                                    </button>
                                </div>
                                <div className="col s4">
                                    <a id="updateEmployee" className="btn btn-large waves-effect waves-light blue accent-3"
                                    onClick={this.handleUpdateForm}>Update
                                        <i className="material-icons right">edit</i>
                                    </a>
                                </div>
                                <div className="col s4">
                                    <a id="removeEmployee" className="btn btn-large waves-effect waves-light red accent-3"
                                    onClick={this.handleRemoveForm}>Remove
                                        <i className="material-icons right">person_outline</i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ManagerEmployeeAll;