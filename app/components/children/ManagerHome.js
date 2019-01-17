var React = require("react");
var helpers = require("../utils/helpers");
var ScheduleView = require("./ScheduleView");
var AnnouncementsBuild = require("./AnnouncementsBuild");
var AnnouncementsView = require("./AnnouncementsView");
var ExportView = require("./ExportView");

var ManagerHome = React.createClass({
  getInitialState: function () {
    return {
      location: "",
      content: "",
      department: ""
    };
  },

  componentDidMount: function () {
    this.getAnnouncements();
    this.getAllDepartments();
  },

  getAllDepartments: function () {
    helpers.getAllDepartments().then(
      function (response) {
        this.setState({
          department: response.data.department
        });
      }.bind(this)
    );
  },
  getAnnouncements: function () {
    helpers.getAnnouncements().then(
      function (response) {
        this.setState({
          location: response.data[response.data.length - 1].location,
          content: response.data[response.data.length - 1].content
        });
      }.bind(this)
    );
  },

  render: function () {

    return (
      <div>
        <ExportView />
        <ScheduleView />
      </div>
    );
  }
});



module.exports = ManagerHome;
