var React = require("react");
var helpers = require("../utils/helpers");
var ScheduleView = React.createClass({

    getInitialState: function() {
        return {
            empSchedules: [],
            departments: [],
            filter: "",
            isLoaded: false
        };
    },

    componentDidMount: function() {
        helpers.getAllDepartments().then(function(response){
            if (response !== this.state.departments) {
            this.setState({
                departments: response.data.department,
                isLoaded: true
                
            }, this.getOptions());
            }
        }.bind(this));
        
        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
        }.bind(this));
     
    },

    handleUserChange(event) {
        this.setState({ [event.target.name]: event.target.value});
     },


    shouldComponentUpdate(nextProps, nextState){
        if ( this.state.input == nextState.input){
            return true;
        }
       

  },

    render: function() {
       
            return ( 
                <div className="row">
                    <div className="col s12">
                        <div className="section">
                            <h5>Week at a glance</h5>
                            <table className="bordered highlight">
                                <thead>
                                    <tr>
                                        <th data-field="name">Name</th>
                                        <th data-field="name">Mon</th>
                                        <th data-field="name">Tues</th>
                                        <th data-field="name">Wed</th>
                                        <th data-field="name">Thurs</th>
                                        <th data-field="name">Fri</th>
                                        <th data-field="name">Sat</th>
                                        <th data-field="name">Sun</th>
                                        <th data-field="name">
                                        
                                        <select>
                                            <option value="">Department</option>
                                            {
                                               (this.state.isLoaded) ? this.state.departments.map((each, i) => {
                                                return(<option key={i} value={each}>{each}</option>)
                                            }) : <option>NOthing</option>
                                            }
                                            {console.log(this.state)}
                                        </select>
                                        
                                        </th>
    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.empSchedules.map(function(schedules, i) {
    
                                    return (
                                        <tr key={i}>
                                            <td className="fullName">
                                                {schedules.firstName} {schedules.lastName}
                                            </td>
                                            <td className="schedule">
                                                {schedules.monday}
                                            </td>
                                            <td>
                                                {schedules.tuesday}
                                            </td>
                                            <td>
                                                {schedules.wednesday}
                                            </td>
                                            <td>
                                                {schedules.thursday}
                                            </td>
                                            <td>
                                                {schedules.friday}
                                            </td>
                                            <td>
                                                {schedules.saturday}
                                            </td>
                                            <td>
                                                {schedules.sunday}
                                            </td>
                                            <td>
                                                {schedules.department}
                                            </td>
                                        </tr>
                                    );
                                }, this)}
                                </tbody>
                            </table>
                              
                            <select>
                                            <option value={this.state.filter} onChange={this.handleUserChange}>Department</option>
                                            {
                                               this.state.departments.map((each, i) => {
                                                return(<option key={i} value={each}>{each}</option>)
                                            },)
                                            }
                            </select>
                        </div>
                    </div>
                </div>
            );
        }
});

module.exports = ScheduleView;