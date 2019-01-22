var React = require("react");
var helpers = require("../utils/helpers");

var ScheduleView = React.createClass({
  getInitialState: function () {
    return {
      empSchedules: [],
      departments: [],
      isLoaded: false,
      filter: "all",
      view: "all",
      day: "",
      emp_selected: [],
      location: "",
      content: "",
      wordCount: 0,
      textBody: "",
      time: ""
    };
  },

  componentDidMount: function () {
    helpers.getEmpSchedules().then(
      function (response) {
        if (response !== this.state.empSchedules) {
          this.setState({ empSchedules: response.data });
        }
      }.bind(this)
    );
    $("body").on("click", "td:has(div)", function () {
      $(".module").show();
    });
    $(".foreground").click(function () {
      $(".module").hide();
    })
  },

  componentWillMount: function () {
    helpers.getAllDepartments().then(
      function (response) {
        this.setState(
          {
            departments: response.data.department
          },
          this.setState({ isLoaded: true })
        );
      }.bind(this)
    );
  },

  handleUpdateEmpSchedule: function (event) {


    var toArray = [];

    // loop through all employees
    this.assignSchedule(this.state.emp_selected);
    toArray.push(this.state.emp_selected.phoneCode);

    // send out the text blast
    this.prepareSMS(toArray);

  },


  prepareSMS: function (toArray) {
    this.prepareTextBody();
    // send phone array and text to backend
    $.ajax({
      url: "/sms-send",
      type: "post",
      data: {
        to: toArray,
        des: this.state.textBody,
      }
    })
  },


  handleSquareSelection(user, day) {
    this.setState({
      day: day,
      emp_selected: user
    })

  },

  handleUserChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  },


  addAnnouncements: function (event) {
    event.preventDefault(event);
    helpers.addAnnouncements(this.state.location, this.state.content).then(
      function (response) {
        this.clearStates();
      }.bind(this)
    );
    Materialize.toast("Announcement added", 3000);
    this.clearForm();
  },

  handleAnnouncementBuild(event) {
    this.setState({ [event.target.id]: event.target.value });
  },

  wordCount(event) {
    this.prepareTextBody();
    this.setState({ wordCount: this.state.textBody.length });
    this.forceUpdate();
  },

  prepareTextBody: function () {
    var trimDay = this.state.day.slice(0, 3);

    this.state.textBody = this.state.time + " " + this.state.day +
      " at " + this.state.location + " " + this.state.content +
      " Please respond with y-" + trimDay + " or n-" + trimDay;

    this.state.textBody.trim();
  },

  assignSchedule: function (person) {
    person[this.state.day] = this.state.time;
    person[this.state.day + "_location"] = this.state.location;
    person[this.state.day + "_des"] = this.state.content;
    person[this.state.day + "_accept"] = 0;
    helpers.updateEmpSchedule(person).then(
      function (response) {
        var empName = person.firstName + " " + person.lastName + "'s ";
        Materialize.toast(empName + "schedule updated", 2000);
      }.bind(this)
    );
  },

  setTime(event) {
    this.setState({ time: event.target.value });
  },

  render: function () {
    return (
      <div className="row">
        <div className="col s12">
          <div className="section">
            <div className="module">
              <div className="foreground">

              </div>



              <div className="main-panel">
                <form onSubmit={this.addAnoucements}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder="Job location"
                        id="location"
                        type="text"
                        className="validate"
                        value={this.state.location}
                        onChange={this.handleAnnouncementBuild} onKeyDown={this.wordCount} onKeyUp={this.wordCount}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input type="text" placeholder="Time" onInput={this.setTime} onKeyDown={this.wordCount} onKeyUp={this.wordCount} />

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
                        onChange={this.handleAnnouncementBuild} onKeyDown={this.wordCount} onKeyUp={this.wordCount}
                        required
                      />
                    </div>
                  </div>

                  {(this.state.wordCount > 160) ?
                    <div className="row">
                      <div className="col s12">
                        <div className="alert"><strong>Oh snap!</strong> You exceeded 160 characters. <strong>This will cost more.</strong></div>
                      </div>
                    </div> : null}
                  <div className="row">
                    <div className="col s12">
                      <h5>PREVIEW</h5>
                      <div className="preview">
                        {this.state.textBody}
                      </div>
                      <div className="wordCount">
                        Character count: {this.state.wordCount} / 160
                      </div>
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





            </div>
            <div className="filter-option">
              <div className="left-hand">
                <h5>Schedule View</h5>
              </div>
              <div className="right-hand">
                <select
                  className="browser-default"
                  name="view"
                  onChange={this.handleUserChange}
                >
                  <option value="all">Filter Accepted</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Declined">Declined</option>
                  <option value="NotAccepted">Not Accepted</option>
                </select>

                <select
                  className="browser-default"
                  name="filter"
                  onChange={this.handleUserChange}
                >
                  <option value="all">Filter Departments</option>
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
              </div>
            </div>
            <div className="responsiveTable">
              <table className="bordered highlight mainview">
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
                    <th data-field="name">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.empSchedules.map(function (schedules, i) {
                    if (this.state.filter == "all") {
                      if (this.state.view == "all") {
                        return (
                          <tr key={i}>
                            <td className="fullName">
                              {schedules.firstName} {schedules.lastName}
                            </td>
                            <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                              <div className={(schedules.monday_accept == 1) ? "accept" : (schedules.monday_accept == 2) ? "decline" : (schedules.monday.length > 0) ? "not-accept" : ""}>
                                {schedules.monday}
                                <br />
                                <b>{schedules.monday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.monday_des}</i>
                                </div>
                                {schedules.monday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.monday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.monday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                              <div className={(schedules.tuesday_accept == 1) ? "accept" : (schedules.tuesday_accept == 2) ? "decline" : (schedules.tuesday.length > 0) ? "not-accept" : ""}>
                                {schedules.tuesday}
                                <br />
                                <b>{schedules.tuesday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.tuesday_des}</i>
                                </div>
                                {schedules.tuesday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.tuesday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.tuesday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                              <div className={(schedules.wednesday_accept == 1) ? "accept" : (schedules.wednesday_accept == 2) ? "decline" : (schedules.wednesday.length > 0) ? "not-accept" : ""}>
                                {schedules.wednesday}

                                <br />
                                <b>{schedules.wednesday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.wednesday_des}</i>
                                </div>
                                {schedules.wednesday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.wednesday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.wednesday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                              <div className={(schedules.thursday_accept == 1) ? "accept" : (schedules.thursday_accept == 2) ? "decline" : (schedules.thursday.length > 0) ? "not-accept" : ""}>
                                {schedules.thursday}
                                <br />
                                <b>{schedules.thursday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.thursday_des}</i>
                                </div>
                                {schedules.thursday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.thursday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.thursday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                              <div className={(schedules.friday_accept == 1) ? "accept" : (schedules.friday_accept == 2) ? "decline" : (schedules.friday.length > 0) ? "not-accept" : ""}>
                                {schedules.friday}
                                <br />
                                <b>{schedules.friday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.friday_des}</i>
                                </div>
                                {schedules.friday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.friday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.friday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                              <div className={(schedules.saturday_accept == 1) ? "accept" : (schedules.saturday_accept == 2) ? "decline" : (schedules.saturday.length > 0) ? "not-accept" : ""}>
                                {schedules.saturday}
                                <br />
                                <b>{schedules.saturday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.saturday_des}</i>
                                </div>
                                {schedules.saturday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.saturday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.saturday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                              <div className={(schedules.sunday_accept == 1) ? "accept" : (schedules.sunday_accept == 2) ? "decline" : (schedules.sunday.length > 0) ? "not-accept" : ""}>
                                {schedules.sunday}
                                <br />
                                <b>{schedules.sunday_location}</b>
                                <br />
                                <div>
                                  <i>{schedules.sunday_des}</i>
                                </div>
                                {schedules.sunday_accept == 1 ? (
                                  <b style={{ color: "green" }}>Accepted</b>
                                ) : schedules.sunday_accept == 2 ? (
                                  <b style={{ color: "red" }}>Declined</b>
                                ) : schedules.sunday.length > 0 ? (
                                  <b style={{ color: "orange" }}>Not Accepted</b>
                                ) : null}
                              </div>

                            </td>
                            <td>{schedules.department}</td>
                          </tr>
                        );
                      } else if (this.state.view == "Accepted") {
                        return (
                          <tr key={i}>
                            <td className="fullName">
                              {schedules.firstName} {schedules.lastName}
                            </td>
                            <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                              {schedules.monday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.monday}
                                  <br />
                                  <b>{schedules.monday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.monday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                              {schedules.tuesday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.tuesday}
                                  <br />
                                  <b>{schedules.tuesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.tuesday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                              {schedules.wednesday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.wednesday}
                                  <br />
                                  <b>{schedules.wednesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.wednesday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                              {schedules.thursday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.thursday}
                                  <br />
                                  <b>{schedules.thursday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.thursday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                              {schedules.friday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.friday}
                                  <br />
                                  <b>{schedules.friday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.friday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                              {schedules.saturday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.saturday}
                                  <br />
                                  <b>{schedules.saturday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.saturday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                              {schedules.sunday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.sunday}
                                  <br />
                                  <b>{schedules.sunday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.sunday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td>{schedules.department}</td>
                          </tr>
                        );
                      } else if (this.state.view == "Accepted") {
                        return (
                          <tr key={i}>
                            <td className="fullName">
                              {schedules.firstName} {schedules.lastName}
                            </td>
                            <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                              {schedules.monday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.monday}
                                  <br />
                                  <b>{schedules.monday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.monday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                              {schedules.tuesday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.tuesday}
                                  <br />
                                  <b>{schedules.tuesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.tuesday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                              {schedules.wednesday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.wednesday}
                                  <br />
                                  <b>{schedules.wednesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.wednesday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                              {schedules.thursday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.thursday}
                                  <br />
                                  <b>{schedules.thursday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.thursday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                              {schedules.friday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.friday}
                                  <br />
                                  <b>{schedules.friday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.friday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                              {schedules.saturday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.saturday}
                                  <br />
                                  <b>{schedules.saturday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.saturday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                              {schedules.sunday_accept == 1 ? (
                                <div className="accept">
                                  {schedules.sunday}
                                  <br />
                                  <b>{schedules.sunday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.sunday_des}</i>
                                  </div>
                                  <b style={{ color: "green" }}>Accepted</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td>{schedules.department}</td>
                          </tr>
                        );
                      } else if (this.state.view == "Declined") {
                        return (
                          <tr key={i}>
                            <td className="fullName">
                              {schedules.firstName} {schedules.lastName}
                            </td>
                            <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                              {schedules.monday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.monday}
                                  <br />
                                  <b>{schedules.monday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.monday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                              {schedules.tuesday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.tuesday}
                                  <br />
                                  <b>{schedules.tuesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.tuesday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                              {schedules.wednesday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.wednesday}
                                  <br />
                                  <b>{schedules.wednesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.wednesday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                              {schedules.thursday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.thursday}
                                  <br />
                                  <b>{schedules.thursday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.thursday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                              {schedules.friday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.friday}
                                  <br />
                                  <b>{schedules.friday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.friday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                              {schedules.saturday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.saturday}
                                  <br />
                                  <b>{schedules.saturday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.saturday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                              {schedules.sunday_accept == 2 ? (
                                <div className="decline">
                                  {schedules.sunday}
                                  <br />
                                  <b>{schedules.sunday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.sunday_des}</i>
                                  </div>
                                  <b style={{ color: "red" }}>Declined</b>{" "}
                                </div>
                              ) : null}
                            </td>
                            <td>{schedules.department}</td>
                          </tr>
                        );
                      } else if (this.state.view == "NotAccepted") {
                        return (
                          <tr key={i}>
                            <td className="fullName">
                              {schedules.firstName} {schedules.lastName}
                            </td>
                            <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                              {schedules.monday_accept == 0 &&
                                schedules.monday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.monday}
                                    <br />
                                    <b>{schedules.monday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.monday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                              {schedules.tuesday_accept == 0 &&
                                schedules.tuesday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.tuesday}
                                    <br />
                                    <b>{schedules.tuesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.tuesday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                              {schedules.wednesday_accept == 0 &&
                                schedules.wednesday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.wednesday}
                                    <br />
                                    <b>{schedules.wednesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.wednesday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                              {schedules.thursday_accept == 0 &&
                                schedules.thursday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.thursday}
                                    <br />
                                    <b>{schedules.thursday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.thursday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                              {schedules.friday_accept == 0 &&
                                schedules.friday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.friday}
                                    <br />
                                    <b>{schedules.friday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.friday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                              {schedules.saturday_accept == 0 &&
                                schedules.saturday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.saturday}
                                    <br />
                                    <b>{schedules.saturday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.saturday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                              {schedules.sunday_accept == 0 &&
                                schedules.sunday.length > 0 ? (
                                  <div className="not-accept">
                                    {schedules.sunday}
                                    <br />
                                    <b>{schedules.sunday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.sunday_des}</i>
                                    </div>
                                    <b style={{ color: "orange" }}>Not Accepted</b>{" "}
                                  </div>
                                ) : null}
                            </td>
                            <td>{schedules.department}</td>
                          </tr>
                        );
                      }
                    } else {
                      if (schedules.department == this.state.filter) {
                        if (this.state.view == "all") {
                          return (
                            <tr key={i}>
                              <td className="fullName">
                                {schedules.firstName} {schedules.lastName}
                              </td>
                              <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                                <div className={(schedules.monday_accept == 1) ? "accept" : (schedules.monday_accept == 2) ? "decline" : (schedules.monday.length > 0) ? "not-accept" : ""}>
                                  {schedules.monday}
                                  <br />
                                  <b>{schedules.monday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.monday_des}</i>
                                  </div>
                                  {schedules.monday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.monday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.monday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                                <div className={(schedules.tuesday_accept == 1) ? "accept" : (schedules.tuesday_accept == 2) ? "decline" : (schedules.tuesday.length > 0) ? "not-accept" : ""}>
                                  {schedules.tuesday}
                                  <br />
                                  <b>{schedules.tuesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.tuesday_des}</i>
                                  </div>
                                  {schedules.tuesday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.tuesday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.tuesday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                                <div className={(schedules.wednesday_accept == 1) ? "accept" : (schedules.wednesday_accept == 2) ? "decline" : (schedules.wednesday.length > 0) ? "not-accept" : ""}>
                                  {schedules.wednesday}
                                  <br />
                                  <b>{schedules.wednesday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.wednesday_des}</i>
                                  </div>
                                  {schedules.wednesday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.wednesday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.wednesday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                                <div className={(schedules.thursday_accept == 1) ? "accept" : (schedules.thursday_accept == 2) ? "decline" : (schedules.thursday.length > 0) ? "not-accept" : ""}>
                                  {schedules.thursday}
                                  <br />
                                  <b>{schedules.thursday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.thursday_des}</i>
                                  </div>
                                  {schedules.thursday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.thursday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.thursday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                                <div className={(schedules.friday_accept == 1) ? "accept" : (schedules.friday_accept == 2) ? "decline" : (schedules.friday.length > 0) ? "not-accept" : ""}>
                                  {schedules.friday}
                                  <br />
                                  <b>{schedules.friday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.friday_des}</i>
                                  </div>
                                  {schedules.friday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.friday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.friday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                                <div className={(schedules.saturday_accept == 1) ? "accept" : (schedules.saturday_accept == 2) ? "decline" : (schedules.saturday.length > 0) ? "not-accept" : ""}>
                                  {schedules.saturday}
                                  <br />
                                  <b>{schedules.saturday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.saturday_des}</i>
                                  </div>
                                  {schedules.saturday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.saturday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.saturday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                                <div className={(schedules.sunday_accept == 1) ? "accept" : (schedules.sunday_accept == 2) ? "decline" : (schedules.sunday.length > 0) ? "not-accept" : ""}>
                                  {schedules.sunday}
                                  <br />
                                  <b>{schedules.sunday_location}</b>
                                  <br />
                                  <div>
                                    <i>{schedules.sunday_des}</i>
                                  </div>
                                  {schedules.sunday_accept == 1 ? (
                                    <b style={{ color: "green" }}>Accepted</b>
                                  ) : schedules.sunday_accept == 2 ? (
                                    <b style={{ color: "red" }}>Declined</b>
                                  ) : schedules.sunday.length > 0 ? (
                                    <b style={{ color: "orange" }}>Not Accepted</b>
                                  ) : null}
                                </div>

                              </td>
                              <td>{schedules.department}</td>
                            </tr>
                          );
                        } else if (this.state.view == "Accepted") {
                          return (
                            <tr key={i}>
                              <td className="fullName">
                                {schedules.firstName} {schedules.lastName}
                              </td>
                              <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                                {schedules.monday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.monday}
                                    <br />
                                    <b>{schedules.monday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.monday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                                {schedules.tuesday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.tuesday}
                                    <br />
                                    <b>{schedules.tuesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.tuesday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                                {schedules.wednesday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.wednesday}
                                    <br />
                                    <b>{schedules.wednesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.wednesday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                                {schedules.thursday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.thursday}
                                    <br />
                                    <b>{schedules.thursday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.thursday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                                {schedules.friday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.friday}
                                    <br />
                                    <b>{schedules.friday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.friday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                                {schedules.saturday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.saturday}
                                    <br />
                                    <b>{schedules.saturday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.saturday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                                {schedules.sunday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.sunday}
                                    <br />
                                    <b>{schedules.sunday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.sunday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td>{schedules.department}</td>
                            </tr>
                          );
                        } else if (this.state.view == "Accepted") {
                          return (
                            <tr key={i}>
                              <td className="fullName">
                                {schedules.firstName} {schedules.lastName}
                              </td>
                              <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                                {schedules.monday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.monday}
                                    <br />
                                    <b>{schedules.monday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.monday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                                {schedules.tuesday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.tuesday}
                                    <br />
                                    <b>{schedules.tuesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.tuesday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                                {schedules.wednesday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.wednesday}
                                    <br />
                                    <b>{schedules.wednesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.wednesday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                                {schedules.thursday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.thursday}
                                    <br />
                                    <b>{schedules.thursday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.thursday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                                {schedules.friday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.friday}
                                    <br />
                                    <b>{schedules.friday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.friday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                                {schedules.saturday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.saturday}
                                    <br />
                                    <b>{schedules.saturday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.saturday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                                {schedules.sunday_accept == 1 ? (
                                  <div className="accept">
                                    {schedules.sunday}
                                    <br />
                                    <b>{schedules.sunday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.sunday_des}</i>
                                    </div>
                                    <b style={{ color: "green" }}>Accepted</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td>{schedules.department}</td>
                            </tr>
                          );
                        } else if (this.state.view == "Declined") {
                          return (
                            <tr key={i}>
                              <td className="fullName">
                                {schedules.firstName} {schedules.lastName}
                              </td>
                              <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                                {schedules.monday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.monday}
                                    <br />
                                    <b>{schedules.monday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.monday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                                {schedules.tuesday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.tuesday}
                                    <br />
                                    <b>{schedules.tuesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.tuesday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                                {schedules.wednesday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.wednesday}
                                    <br />
                                    <b>{schedules.wednesday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.wednesday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                                {schedules.thursday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.thursday}
                                    <br />
                                    <b>{schedules.thursday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.thursday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                                {schedules.friday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.friday}
                                    <br />
                                    <b>{schedules.friday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.friday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                                {schedules.saturday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.saturday}
                                    <br />
                                    <b>{schedules.saturday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.saturday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                                {schedules.sunday_accept == 2 ? (
                                  <div className="decline">
                                    {schedules.sunday}
                                    <br />
                                    <b>{schedules.sunday_location}</b>
                                    <br />
                                    <div>
                                      <i>{schedules.sunday_des}</i>
                                    </div>
                                    <b style={{ color: "red" }}>Declined</b>{" "}
                                  </div>
                                ) : null}
                              </td>
                              <td>{schedules.department}</td>
                            </tr>
                          );
                        } else if (this.state.view == "NotAccepted") {
                          return (
                            <tr key={i}>
                              <td className="fullName">
                                {schedules.firstName} {schedules.lastName}
                              </td>
                              <td className="schedule" onClick={() => { this.handleSquareSelection(schedules, "monday") }}>
                                {schedules.monday_accept == 0 &&
                                  schedules.monday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.monday}
                                      <br />
                                      <b>{schedules.monday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.monday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "tuesday") }}>
                                {schedules.tuesday_accept == 0 &&
                                  schedules.tuesday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.tuesday}
                                      <br />
                                      <b>{schedules.tuesday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.tuesday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "wednesday") }}>
                                {schedules.wednesday_accept == 0 &&
                                  schedules.wednesday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.wednesday}
                                      <br />
                                      <b>{schedules.wednesday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.wednesday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "thursday") }}>
                                {schedules.thursday_accept == 0 &&
                                  schedules.thursday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.thursday}
                                      <br />
                                      <b>{schedules.thursday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.thursday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "friday") }}>
                                {schedules.friday_accept == 0 &&
                                  schedules.friday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.friday}
                                      <br />
                                      <b>{schedules.friday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.friday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "saturday") }}>
                                {schedules.saturday_accept == 0 &&
                                  schedules.saturday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.saturday}
                                      <br />
                                      <b>{schedules.saturday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.saturday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td onClick={() => { this.handleSquareSelection(schedules, "sunday") }}>
                                {schedules.sunday_accept == 0 &&
                                  schedules.sunday.length > 0 ? (
                                    <div className="not-accept">
                                      {schedules.sunday}
                                      <br />
                                      <b>{schedules.sunday_location}</b>
                                      <br />
                                      <div>
                                        <i>{schedules.sunday_des}</i>
                                      </div>
                                      <b style={{ color: "orange" }}>
                                        Not Accepted
                                  </b>{" "}
                                    </div>
                                  ) : null}
                              </td>
                              <td>{schedules.department}</td>
                            </tr>
                          );
                        }
                      }
                    }
                  }, this)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ScheduleView;
