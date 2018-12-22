var React = require('react')
var helpers = require('../utils/helpers')
var IndividualView = require('./IndividualView')
var AnnouncementsView = require('./AnnouncementsView')

var EmployeeHome = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            content: '',
            username: '',
        }
    },

    componentDidMount: function() {
        this.getAnnouncements()
        helpers.getCurrentUser().then(
            function(response) {
                if (response !== this.state.username) {
                    this.setState({ username: response.data.username })
                }
            }.bind(this)
        )
    },

    // componentDidUpdate: function(prevState) {
    //     if (prevState.title !== this.state.title || prevState.content !== this.state.content) {
    //         this.getAnnouncements();
    //     }
    // },

    getAnnouncements: function() {
        helpers.getAnnouncements().then(
            function(response) {
                this.setState({
                    title: response.data[response.data.length - 1].title,
                    content: response.data[response.data.length - 1].content,
                })
            }.bind(this)
        )
    },

    render: function() {
        return (
            <div>
                {/* <AnnouncementsView title={this.state.title} content={this.state.content}/> */}
                <IndividualView />
            </div>
        )
    },
})

module.exports = EmployeeHome
