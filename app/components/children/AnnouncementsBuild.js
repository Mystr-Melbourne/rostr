var React = require("react");
var helpers = require("../utils/helpers");

var AnnouncementsBuild = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            content: "",
            departments: [],
            sendTo: ""
        };
    },

    componentDidMount: function() {
        helpers.getAllDepartments().then(function(response){
            this.setState({
                departments: response.data.department,
                
            }, this.setState({isLoaded: true}));
        }.bind(this));  
    },
    //
    // getAnnouncements: function() {
    //     helpers.getAnnouncements().then(function(response) {
    //
    //     }.bind(this));
    // },

    handleAnnouncementBuild(event) {
       this.setState({ [event.target.id]: event.target.value});
    },

    addAnnouncements: function(event) {
        event.preventDefault(event);
        helpers.addAnnouncements(this.state.title, this.state.content).then(function(response) {
            this.clearStates();
        }.bind(this));
        Materialize.toast('Announcement added', 3000);
        this.clearForm();
    },

    clearForm: function() {
        var elements = document.getElementsByTagName("input");
        for (var i=0; i < elements.length; i++) {
            elements[i].value = "";
            elements[i].classList.remove("valid");
        };
    },

    clearStates: function() {
        this.setState({ title: "", content: "" });
    },

    render: function() {
        return (
            <div className="card-panel">
                <div className="row">
                    <div className="col s12">
                        <h5>Make an announcement</h5>
                    </div>
                </div>
                <form onSubmit={this.addAnnouncements}>
                <select className="browser-default" name="sendTo" onChange={this.handleAnnouncementBuild}>
                                            <option value="all">Department</option>
                                          {(this.state.isLoaded)?this.state.departments.map((each, i) => {
                                            return(<option key={i} value={each}>{each}</option>)
                                            }):<option>Nothing</option>}
                                         
                </select>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                placeholder="Job Title"
                                id="title"
                                type="text"
                                className="validate"
                                value={this.state.title}
                                onChange={this.handleAnnouncementBuild}
                                required />
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
                                required>
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className="btn waves-effect waves-light btn-large green accent-3 loginButtons" type="submit" value="Submit" name="action">Submit<i className="material-icons right">add</i></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = AnnouncementsBuild;