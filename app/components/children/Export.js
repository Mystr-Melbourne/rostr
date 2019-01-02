var React = require("react");
var helpers = require("../utils/helpers");
const mongotocsv = require('mongo-to-csv');

var Export = React.createClass({

    getInitialState: function () {
        return {
 
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
            }
        }.bind(this));
    },

    ExportData: function() {

        let options = {
            database: 'users', // required
            collection: 'pets', // required
            fields: ['name','cost'], // required
            output: './output/pets.csv', // required
            allValidOptions: '-q \'{ "name": "cat" }\'' // optional
        };
        mongotocsv.export(options, function (err, success) {
            console.log(err);
            console.log(success);
        });
    },

    render: function () {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col s4">
                        <button id="Export Excel" className="btn btn-large waves-effect waves-light green accent-3" onClick={this.ExportData}>Export Excel File
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