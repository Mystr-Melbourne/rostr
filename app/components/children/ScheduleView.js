var React = require("react");
var helpers = require("../utils/helpers");

var ScheduleView = React.createClass({

    getInitialState: function() {
        return {
            empSchedules: [],
            departments: [],
            isLoaded: false,
            filter: "all"
        };
    },

    componentDidMount: function() {
        
        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
        }.bind(this));
     
    },

    componentWillMount: function() {
        helpers.getAllDepartments().then(function(response){
            this.setState({
                departments: response.data.department,
                
            }, this.setState({isLoaded: true}));
        }.bind(this));  
    },

    handleUserChange(event) {
        this.setState({ [event.target.name]: event.target.value});
     },

    render: function() {
            return (
                <div className="row">
                    <div className="col s12">
                        <div className="section">
                            <h5>My roster</h5>
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
                                        
                                        <select className="browser-default" name="filter" onChange={this.handleUserChange}>
                                            <option value="all">Department</option>
                                          {(this.state.isLoaded)?this.state.departments.map((each, i) => {
                                            return(<option key={i} value={each}>{each}</option>)
                                            }):<option>Nothing</option>}
                                         
                                        </select>
                                        </th>
    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.empSchedules.map(function(schedules, i) {
                                        if(this.state.filter == "all") {
                                            return (
                                                <tr key={i}>
                                                    <td className="fullName">
                                                        {schedules.firstName} {schedules.lastName}
                                                    </td>
                                                    <td className="schedule">
                                                        {schedules.monday}<br/>
                                                        <b>{schedules.monday_title}</b><br />
                                                        <i>{schedules.monday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.tuesday}<br />
                                                        <b>{schedules.tuesday_title}</b><br />
                                                        <i>{schedules.tuesday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.wednesday}<br />
                                                        <b>{schedules.wednesday_title}</b><br />
                                                        <i>{schedules.wednesday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.thursday}<br />
                                                        <b>{schedules.thursday_title}</b><br />
                                                        <i>{schedules.thursday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.friday}<br />
                                                        <b>{schedules.friday_title}</b><br />
                                                        <i>{schedules.friday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.saturday} <br/>
                                                        <b>{schedules.friday_title}</b><br />
                                                        <i>{schedules.friday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.sunday}<br />
                                                        <b>{schedules.sunday_title}</b><br />
                                                        <i>{schedules.sunday_des}</i>
                                                    </td>
                                                    <td>
                                                        {schedules.department}
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            if(schedules.department == this.state.filter) {
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
                                            }
                                        }
                                }, this)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
});

module.exports = ScheduleView;