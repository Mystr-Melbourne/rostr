var React = require("react");
var helpers = require("../utils/helpers");

var IndividualView = React.createClass({
    getInitialState: function() {
        return {
            empSchedules: [],
            username: "",
            day: ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
        };
    },

    componentDidMount: function() {
        helpers.getCurrentUser().then(function(response) {
            if (response !== this.state.username) {
              this.setState({ username: response.data.username});
            }
        }.bind(this));

        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
        }.bind(this));

    },

    render: function() {
        return(
            <div>
            {this.state.empSchedules.map((person,i) => {

               
                if(person.phone == this.state.username) {
                    return this.state.day.map((day) => {
                        if(person[day].length > 0) {
                            return(
                                <div className="card-panel">
                                    <div className="row">
                                        <div className="col s6">
                                            <h5>{person[day + "_title"]}</h5>
                                            <p>{person[day + "_des"]}</p>
                                            <p>Time: {person[day]}</p>
                                        </div>
                                        <div id="accept-reject-button" className="col s6">
                                            <button className="accept-button"><span>Accept</span></button>
                                            <button className="reject-button"><span>Reject</span></button>
                                        </div>
                                    </div>
                                </div>
                            );
                            
                        } else {

                        }
                    })
                }}
            )}
           </div>
        )
    }

});

module.exports = IndividualView;