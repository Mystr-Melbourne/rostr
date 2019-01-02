var React = require("react");
var helpers = require("../utils/helpers");
var mongoexport = require('mongoexport-wrapper');

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

 
        var opt = {
            host : '127.0.0.1:8080', //<hostname><:port>  Default: localhost:27017
            db : 'test',
            collection :'user',
            fields : "user,email,contact",
            out : 'users.csv',
            type : 'csv'
        }
        //mongoexport command should be in path variable
        //all options for mongoexport command can be used
         
        mongoexport(opt,(err,result)=>{
            if(err) console.log(err);
            else console.log(result);
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