var React = require("react");
var helpers = require("../utils/helpers");
//required for csv export
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const mongoose = require('mongoose');
var fileDownload = require('js-file-download');

var Export = React.createClass({

    getInitialState: function () {
        return {
            empSchedules: [],
            result: "",
            allEmployees: []
        };
    },

    componentDidMount: function () {
        this.getEmployees();
        this.getAllDepartments();
        helpers.getEmpSchedules().then(function (response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
        }.bind(this));
    },

    getAllDepartments: function () {
        helpers.getAllDepartments().then(function (response) {
            this.setState({
                departments: response.data.department
            });
        }.bind(this));
    },

    getEmployees: function () {
        helpers.getAllEmployees().then(function (response) {
            if (response !== this.state.allEmployees) {
                this.setState({ allEmployees: response.data });
            }
        }.bind(this));
    },

    ExportEmployeeData: function () {

        const fields = [
            "_id",
            "firstName",
            "lastName",
            "email",
            "phone",
            "phoneType",
            "department",
            "active"
        ];

        const json2csvParser2 = new Json2csvParser({ fields });
        const csv2 = json2csvParser2.parse(this.state.empSchedules);

        console.log(csv2);

        fileDownload(csv2, 'employeelist.csv');


    },


    ExportScheduleData: function () {

        const fields = [
            'emp_id',
            'firstName',
            'lastName',
            'department',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ];

        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(this.state.empSchedules);

        console.log(csv);

        fileDownload(csv, 'empschedules.csv');
    },

    render: function () {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col s4"></div>

                    <div className="col s2">
                        <a id="Export Google Sheets" className="btn btn-large waves-effect waves-light blue accent-3" onClick={this.ExportScheduleData}>Export Roster
                                            <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>
                    <div className="col s3">
                        <a id="Export CSV Text File" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.ExportEmployeeData}>Export Employee List
                                            <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>


                </div>
            </div>
        );
    }
});

module.exports = Export;