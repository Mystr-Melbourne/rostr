var React = require("react");
var helpers = require("../utils/helpers");
var IndividualView = require("./IndividualView");
var AnnouncementsView = require("./AnnouncementsView");

var EmployeeHome = React.createClass({
    getInitialState: function () {
        return {
            location: "",
            content: "",
            username: ""
        };
    },

    componentDidMount: function () {
        this.getAnnouncements();
        helpers.getCurrentUser().then(function (response) {
            if (response !== this.state.username) {
                this.setState({ username: response.data.username });
            }
        }.bind(this));
    },

    getAnnouncements: function () {
        helpers.getAnnouncements().then(function (response) {
            this.setState({
                location: response.data[response.data.length - 1].location,
                content: response.data[response.data.length - 1].content
            });
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <IndividualView />
            </div>
        );
    }
});

module.exports = EmployeeHome;