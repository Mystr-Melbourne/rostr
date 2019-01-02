var React = require("react");
var helpers = require("../utils/helpers");
//required for csv export
const fs = require('fs');
const json2csv = require('json2csv').parse;
const mongoose = require('mongoose');

var Export = React.createClass({

    getInitialState: function () {
        return {
            empSchedules: [],
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

    ExportData: function () {

        var fields = ['car.make', 'car.model', 'price', 'color'];
        
        var EmployeeSchedule = this.state.empSchedules;

        var csv = json2csv({ data: EmployeeSchedule, fields: fields });

        // fs.writeFile('file.csv', csv, function (err) {
        //     if (err) throw err;
        //     console.log('file saved');
        // });
        $.ajax({
            url: '/getCSV',
            type: 'post',
            data: ({
                csv: csv,
            })
        })
        console.log(csv);


        // res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
        // res.set('Content-Type', 'text/csv');
        // res.status(200).send(csv)


    },

    render: function () {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col s4">
                        <button id="Export Excel" className="btn btn-large waves-effect waves-light green accent-3" onClick="window.location.href='/exportCSV'">Export Excel File
                                        <i className="material-icons right">insert_drive_file</i>
                        </button>
                    </div>
                    <div className="col s4">
                        <a id="Export Google Sheets" className="btn btn-large waves-effect waves-light blue accent-3" onClick={this.ExportData}>Export Google Sheets
                                        <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>
                    <div className="col s4">
                        <a id="Export CSV Text File" className="btn btn-large waves-effect waves-light red accent-3" onClick={this.ExportData}>Export CSV Text File
                                        <i className="material-icons right">insert_drive_file</i>
                        </a>
                    </div>

                </div>
            </div>
        );
    }
});

module.exports = Export;