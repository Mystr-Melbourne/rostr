var React = require("react");
var helpers = require("./utils/helpers");

var Manager = React.createClass({

    getInitialState: function () {
        return {
            username: "",
            picture: ""
        };
    },

    componentDidMount: function () {
        helpers.getCurrentUser().then(function (response) {
            if (response !== this.state.username) {
                this.setState({ picture: response.data.picture, username: response.data.username });
            }
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <ul id="dropdown1" className="dropdown-content">
                    <li><a className="black-text" href="/logout">Logout<i className="material-icons right">exit_to_app</i></a></li>
                </ul>
                <nav>
                    <div className="nav-wrapper">
                        <a href="/manager" className="brand-logo"><span className="">Rostr</span></a>
                        <a href="/" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a className="black-text" href="/manager">Home<i className="material-icons right">group</i></a></li>

                            <li><a className="black-text" href="/manager/employeeAll">Edit Staff<i className="material-icons right">group</i></a></li>
                            {/* <li><a className="black-text" href="/manager/schedulesCreate">Edit Schedule<i className="material-icons right">access_time</i></a></li> */}
                            <li><a className="dropdown-button black-text" href="#" data-activates="dropdown1" data-beloworigin="true" data-hover="true">{this.state.username}<img className="circle circle-small" src={this.state.picture} /></a></li>
                        </ul>
                        <ul id="slide-out" className="side-nav">
                            <li>
                                <div className="userView">
                                    <div className="background">
                                        <img src="http://materializecss.com/images/office.jpg" />
                                    </div>
                                    <a><img className="circle" src={this.state.picture} /></a>
                                    <a><span className="white-text">Company Name</span></a>
                                    <a><span className="white-text name">{this.state.username}</span></a>
                                </div>
                            </li>
                            <li><a href="/manager" className=""><i className="material-icons">group</i>Home</a></li>
                            <li><a href="/manager/employeeAll" className=""><i className="material-icons">group</i>Edit Staff</a></li>
                            {/* <li><a href="/manager/schedulesCreate" className="black-text"><i className="material-icons">access_time</i>Edit Schedule</a></li> */}
                            <li><a href="/logout" className=""><i className="material-icons">exit_to_app</i>Logout</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = Manager;