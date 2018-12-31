var React = require("react");
var helpers = require("../utils/helpers");

var Export = React.createClass({

    getInitialState: function () {
        return {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            phoneType: "",
            password: "",
            allEmployees: [],
            selectedEmployee: "",
            emp_id: "",
            department: "",
            departments: [],
            empSchedules: [],
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

    render: function () {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col s4">
                        <button id="Export Excel" className="btn btn-large waves-effect waves-light green accent-3" type="submit" value="Submit" form="addNew">Export Excel File
                                        <i className="material-icons right">insert_drive_file</i>
                        </button>
                    </div>
                    <div className="col s4">
                        <a id="Export Google Sheets" className="btn btn-large waves-effect waves-light blue accent-3" onClick={this.handleUpdateForm}>Export Google Sheets
                                        <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>
                    <div className="col s4">
                        <a id="Export CSV Text File" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.handleRemoveForm}>Export CSV Text File
                                        <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = Export;