var React = require("react");

var AnnouncementsView = React.createClass({
  render: function() {
    return (
      <div className="card-panel">
        <div className="row">
          <div className="col s12">
            <h5>Latest announcement</h5>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            {/* <h5>{this.state.title}</h5> */}
            <h5>{this.props.title}</h5>
            <p>{this.props.content}</p>
            {/* <p>{this.state.content}</p> */}
          </div>
          <div id="accept-reject-button" className="col s6">
            <button className="accept-button">
              <span>Accept</span>
            </button>
            <button className="reject-button">
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AnnouncementsView;
