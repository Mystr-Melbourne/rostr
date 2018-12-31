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

    ExportData: function() {

        var UserSchema = new mongoose.Schema({
            fullname: {type: String},
            email: {type: String},
            age: {type: Number},
            username: {type: String}
          });

          UserSchema.plugin(mongooseToCsv, {
            headers: 'Firstname Lastname Username Email Age',
            constraints: {
              'Username': 'username',
              'Email': 'email',
              'Age': 'age'
            },
            virtuals: {
              'Firstname': function(doc) {
                return doc.fullname.split(' ')[0];
              },
              'Lastname': function(doc) {
                return doc.fullname.split(' ')[1];
              }
            }
          });
           
          var User = mongoose.model('Users', UserSchema);
           
          // Query and stream
          User.findAndStreamCsv({age: {$lt: 40}})
            .pipe(fs.createWriteStream('users_under_40.csv'));
           
          // Create stream from query results
          User.find({}).exec()
            .then(function(docs) {
              User.csvReadStream(docs)
                .pipe(fs.createWriteStream('users.csv'));
            });
           
          // Transform mongoose streams
          User.find({})
            .where('age').gt(20).lt(30)
            .limit(10)
            .sort('age')
            .stream()
            .pipe(User.csvTransformStream())
            .pipe(fs.createWriteStream('users.csv'));
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