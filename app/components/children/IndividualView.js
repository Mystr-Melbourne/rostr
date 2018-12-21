var React = require("react");
var helpers = require("../utils/helpers");
var Materialze = require
var IndividualView = React.createClass({
    getInitialState: function() {
        return {
            empSchedules: [],
            username: "",
            day: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
            department: "",
            person: []
        };
    },

    componentWillMount: function() {
        helpers.getCurrentUser().then(function(response) {
            if (response !== this.state.username) {
              this.setState({ username: response.data.username});
            }
        }.bind(this));

        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
            this.state.empSchedules.map((person) => {
                if(person.phone == this.state.username) {
                    this.setState({person: person});
                }
            })
        }.bind(this));

    },

    handleAccept: function(day,e) {
        let newPerson = Object.assign({},this.state.person);
        newPerson[day + "_accept"] = 1;
        this.setState({person: newPerson});
        this.state.empSchedules.map((person,i) => {
            if(person.phone == this.state.username){ 
                person[day + "_accept"] = 1;
                helpers.updateEmpSchedule(person).then(function(response) {
                    Materialize.toast(day + " schedule updated", 2000);
                }.bind(this));
            }
        });
        if($(e.target).parents().eq(2)[0].className == "row"){
            $(e.target).parents().eq(3).fadeOut();
        } else {
            $(e.target).parents().eq(2).fadeOut();
        }
    },

    handleDecline: function(day,e) {
        let newPerson = Object.assign({},this.state.person);
        newPerson[day + "_accept"] = 2;
        this.setState({person: newPerson});
        this.state.empSchedules.map((person,i) => {
            if(person.phone == this.state.username){ 
                person[day + "_accept"] = 2;
                helpers.updateEmpSchedule(person).then(function(response) {
                    Materialize.toast(day + " schedule updated", 2000);
                }.bind(this));
            }
        });
        if($(e.target).parents().eq(2)[0].className == "row"){
            $(e.target).parents().eq(3).fadeOut();
        } else {
            $(e.target).parents().eq(2).fadeOut();
        }
    },

    render: function() {
        return(
            <div>
            {this.state.empSchedules.map((person,i) => {

               
                if(person.phone == this.state.username) {
                    return this.state.day.map((day) => {
                        // if(person[day].length > 0 && person[day + "_accept"] == 0) {
                            if(person[day].length > 0){
                            return(
                                <div className="card-panel">
                                    <div className="row">
                                        <div className="col s6">
                                            <h5>{person[day + "_title"]}</h5>
                                            <p>{person[day + "_des"]}</p>
                                            <p>Time: {day.charAt(0).toUpperCase() + day.slice(1)}, {person[day]}</p>
                                        </div>
                                        <div id="accept-reject-button" className="col s6">
                                            <button className="accept-button" onClick={(e) => {this.handleAccept(day,e)}}><span>Accept</span></button>
                                            <button className="reject-button" onClick={(e) => {this.handleDecline(day,e)}}><span>Reject</span></button>
                                        </div>
                                    </div>
                                </div>
                            );
                            
                        }
                    })
                }}
            )}
            <table className="bordered highlight">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Job Title</th>
                        <th>Job Description</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.empSchedules.map((person,i) => {
                        if(person.phone == this.state.username) {
                            return this.state.day.map((day) => {
                                if(person[day].length > 0) {
                                    return(
                                        <tr>
                                            <td>{person.department}</td>
                                            <td>{person[day+"_title"]}</td>
                                            <td>{person[day+"_des"]}</td>
                                            <td>{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                                            <td>{person[day]}</td>
                                            <td>{(this.state.person[day+"_accept"] == 1)?<b style={{color: "green"}}>Accepted</b>:(this.state.person[day+"_accept"] == 2) ? <b style={{color: "red"}}>Declined</b> : <b style={{color: "orange"}}>Not Accepted</b>}</td>
                                        </tr>
                                    )
                                }
                            });
                        }
                    })}
                </tbody>
       
            </table>
           
           </div>
        )
    }

});

module.exports = IndividualView;