var React = require("react");
var helpers = require("../utils/helpers");

var IndividualView = React.createClass({
    getInitialState: function() {
        return {
            empSchedules: [],
            username: ""
        };
    },

    componentDidMount: function() {
        helpers.getCurrentUser().then(function(response) {
            console.log(response.data)
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
            {this.state.empSchedules.map((person) => {

            })}
            <div className="card-panel">
                <div className="row">
                    <div className="col s6">
                        <h5>Test</h5>
                        <p>ok</p>
                    </div>
                    <div id="accept-reject-button" className="col s6">
                        <button className="accept-button"><span>Accept</span></button>
                        <button className="reject-button"><span>Reject</span></button>
                    </div>
                </div>
            </div>
            </div>
        )
    }

});

module.exports = IndividualView;