var React = require("react");
var helpers = require("../utils/helpers");

var AnnouncementsBuild = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      content: "",
      departments: [],
      sendTo: "all",
      empSchedules: [],
      day: "",
      time: "",
      wordCount: 0
    };
  },

  componentDidMount: function() {
    helpers.getAllDepartments().then(
      function(response) {
        this.setState(
          {
            departments: response.data.department
          },
          this.setState({ isLoaded: true })
        );
      }.bind(this)
    );
    helpers.getEmpSchedules().then(
      function(response) {
        if (response !== this.state.empSchedules) {
          this.setState({ empSchedules: response.data });
        }
      }.bind(this)
    );
  },
  //
  // getAnnouncements: function() {
  //     helpers.getAnnouncements().then(function(response) {
  //
  //     }.bind(this));
  // },

  handleAnnouncementBuild(event) {
    this.setState({ [event.target.id]: event.target.value });
  },

  wordCount(event) {
    this.setState({ wordCount: event.target.value.length });
  },

  handleManagerSelect(event) {
    this.setState({ [event.target.name]: event.target.value });
  },

  setTime(event) {
    this.setState({ time: event.target.value });
  },

  addAnnouncements: function(event) {
    event.preventDefault(event);
    helpers.addAnnouncements(this.state.title, this.state.content).then(
      function(response) {
        this.clearStates();
      }.bind(this)
    );
    Materialize.toast("Announcement added", 3000);
    this.clearForm();
  },

  clearForm: function() {
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
      elements[i].value = "";
      elements[i].classList.remove("valid");
    }
  },

  clearStates: function() {
    this.setState({ title: "", content: "" });
  },

  handleUpdateEmpSchedule: function(event) {
    var saveButtonBlue = document.getElementById(event);
    this.state.empSchedules.map((person, i) => {
      if (this.state.sendTo == "all") {
        person[this.state.day] = this.state.time;
        person[this.state.day + "_title"] = this.state.title;
        person[this.state.day + "_des"] = this.state.content;
        person[this.state.day + "_accept"] = 0;
        console.log(person);
        helpers.updateEmpSchedule(person).then(
          function(response) {
            var empName = person.firstName + " " + person.lastName + "'s ";
            Materialize.toast(empName + "schedule updated", 2000);
          }.bind(this)
        );
      } else if (person.department == this.state.sendTo) {
        person[this.state.day] = this.state.time;
        person[this.state.day + "_title"] = this.state.title;
        person[this.state.day + "_des"] = this.state.content;
        person[this.state.day + "_accept"] = 0;
        console.log(person);
        helpers.updateEmpSchedule(person).then(
          function(response) {
            var empName = person.firstName + " " + person.lastName + "'s ";
            Materialize.toast(empName + "schedule updated", 2000);
          }.bind(this)
        );
      }
    });
  },

  render: function() {
    return (
      <div className="card-panel">
        <div className="row">
          <div className="col s12">
            <h5>Assign new shifts</h5>
          </div>
        </div>
        <form onSubmit={this.addAnnouncements}>
          <select
            className="browser-default"
            name="sendTo"
            onChange={this.handleManagerSelect}
          >
            <option value="all">All Departments</option>
            {this.state.isLoaded ? (
              this.state.departments.map((each, i) => {
                return (
                  <option key={i} value={each}>
                    {each}
                  </option>
                );
              })
            ) : (
              <option>Nothing</option>
            )}
          </select>
          <br />
          <select
            className="browser-default"
            name="day"
            onChange={this.handleManagerSelect}
          >
            <option value="">Select a day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>

          <input type="text" placeholder="Time" onInput={this.setTime} />
          <br />

          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Job Title"
                id="title"
                type="text"
                className="validate"
                value={this.state.title}
                onChange={this.handleAnnouncementBuild}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea
                placeholder="Description"
                id="content"
                type="text"
                className="materialize-textarea"
                value={this.state.content}
                onChange={this.handleAnnouncementBuild}
                onInput={this.wordCount}
                required
              />
              <p>Word count: {this.state.wordCount}</p>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <button
                className="btn waves-effect waves-light btn-large green accent-3 loginButtons"
                type="submit"
                value="Submit"
                name="action"
                onClick={this.handleUpdateEmpSchedule}
              >
                Submit<i className="material-icons right">add</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = AnnouncementsBuild;