var React = require("react");
var helpers = require("../utils/helpers");

var ScheduleView = React.createClass({

    getInitialState: function() {
        return {
            empSchedules: [],
            departments: [],
            isLoaded: false,
            filter: "all",
            view: "all"
        };
    },

    componentDidMount: function() {
        
        helpers.getEmpSchedules().then(function(response) {
            if (response !== this.state.empSchedules) {
                this.setState({ empSchedules: response.data });
            }
        }.bind(this));
     
    },

    componentWillMount: function() {
        helpers.getAllDepartments().then(function(response){
            this.setState({
                departments: response.data.department,
                
            }, this.setState({isLoaded: true}));
        }.bind(this));  
    },

    handleUserChange(event) {
        this.setState({ [event.target.name]: event.target.value});
     },


    render: function() {
            return (
                <div className="row">
                    <div className="col s12">
                        <div className="section">
                            <h5>Week at a glance</h5>
                            <select className="browser-default" name="view" onChange={this.handleUserChange}>
                                            <option value="all">All</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Declined">Declined</option>
                                            <option value="NotAccepted">Not Accepted</option>

                            </select>
                            <table className="bordered highlight">
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
                                        <th data-field="name">
                                        
                                        <select className="browser-default" name="filter" onChange={this.handleUserChange}>
                                            <option value="all">Department</option>
                                          {(this.state.isLoaded)?this.state.departments.map((each, i) => {
                                            return(<option key={i} value={each}>{each}</option>)
                                            }):<option>Nothing</option>}
                                         
                                        </select>
                                        </th>
    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.empSchedules.map(function(schedules, i) {
                                        if(this.state.filter == "all") {
                                            if(this.state.view == "all") {
                                                return (
                                                    <tr key={i}>
                                                        <td className="fullName">
                                                            {schedules.firstName} {schedules.lastName}
                                                        </td>
                                                        <td className="schedule">
                                                                    <div>
                                                                        {schedules.monday}<br/>
                                                                    <b>{schedules.monday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.monday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.monday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.monday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
                                        
                                                            
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.tuesday}<br/>
                                                                    <b>{schedules.tuesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.tuesday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.tuesday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.tuesday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.wednesday}<br/>
                                                                    <b>{schedules.wednesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.wednesday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.wednesday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.wednesday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.thursday}<br/>
                                                                    <b>{schedules.thursday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.thursday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.thursday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.thursday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.friday}<br/>
                                                                    <b>{schedules.friday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.friday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.friday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.friday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.saturday}<br/>
                                                                    <b>{schedules.saturday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.saturday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.saturday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.saturday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
                                              
                                                        </td>
                                                        <td>
                                                                    <div>
                                                                        {schedules.sunday}<br/>
                                                                    <b>{schedules.sunday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                    </div>
                                                                    {(schedules.sunday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.sunday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.sunday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
    
    
                                                        </td>
                                                        <td>
                                                            {schedules.department}
                                                        </td>
                                                    </tr>
                                                );
                                            } else if (this.state.view == "Accepted") {
                                                return (
                                                    <tr key={i}>
                                                        <td className="fullName">
                                                            {schedules.firstName} {schedules.lastName}
                                                        </td>
                                                        <td className="schedule">
                                                                  {(schedules.monday_accept == 1) ? <div>
                                                                        {schedules.monday}<br/>
                                                                    <b>{schedules.monday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                            
                                        
                                                            
                                                        </td>
                                                        <td>
                                                                  {(schedules.tuesday_accept == 1) ? <div>
                                                                        {schedules.tuesday}<br/>
                                                                    <b>{schedules.tuesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.wednesday_accept == 1) ? <div>
                                                                        {schedules.wednesday}<br/>
                                                                    <b>{schedules.wednesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                 {(schedules.thursday_accept == 1) ? <div>
                                                                        {schedules.thursday}<br/>
                                                                    <b>{schedules.thursday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.friday_accept == 1) ? <div>
                                                                        {schedules.friday}<br/>
                                                                    <b>{schedules.friday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                        </td>
                                                        <td>
                                                                 {(schedules.saturday_accept == 1) ? <div>
                                                                        {schedules.saturday}<br/>
                                                                    <b>{schedules.saturday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                              
                                                        </td>
                                                        <td>
                                                                 {(schedules.sunday_accept == 1) ? <div>
                                                                        {schedules.sunday}<br/>
                                                                    <b>{schedules.sunday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
    
                                                        </td>
                                                        <td>
                                                            {schedules.department}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            else if (this.state.view == "Accepted") {
                                                return (
                                                    <tr key={i}>
                                                        <td className="fullName">
                                                            {schedules.firstName} {schedules.lastName}
                                                        </td>
                                                        <td className="schedule">
                                                                  {(schedules.monday_accept == 1) ? <div>
                                                                        {schedules.monday}<br/>
                                                                    <b>{schedules.monday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                            
                                        
                                                            
                                                        </td>
                                                        <td>
                                                                  {(schedules.tuesday_accept == 1) ? <div>
                                                                        {schedules.tuesday}<br/>
                                                                    <b>{schedules.tuesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.wednesday_accept == 1) ? <div>
                                                                        {schedules.wednesday}<br/>
                                                                    <b>{schedules.wednesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                 {(schedules.thursday_accept == 1) ? <div>
                                                                        {schedules.thursday}<br/>
                                                                    <b>{schedules.thursday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.friday_accept == 1) ? <div>
                                                                        {schedules.friday}<br/>
                                                                    <b>{schedules.friday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                        </td>
                                                        <td>
                                                                 {(schedules.saturday_accept == 1) ? <div>
                                                                        {schedules.saturday}<br/>
                                                                    <b>{schedules.saturday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
                                              
                                                        </td>
                                                        <td>
                                                                 {(schedules.sunday_accept == 1) ? <div>
                                                                        {schedules.sunday}<br/>
                                                                    <b>{schedules.sunday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                    <b style={{color: "green"}}>Accepted</b> </div>: null}
    
    
                                                        </td>
                                                        <td>
                                                            {schedules.department}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            else if (this.state.view == "Declined") {
                                                return (
                                                    <tr key={i}>
                                                        <td className="fullName">
                                                            {schedules.firstName} {schedules.lastName}
                                                        </td>
                                                        <td className="schedule">
                                                                  {(schedules.monday_accept == 2) ? <div>
                                                                        {schedules.monday}<br/>
                                                                    <b>{schedules.monday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
                                                            
                                        
                                                            
                                                        </td>
                                                        <td>
                                                                  {(schedules.tuesday_accept == 2) ? <div>
                                                                        {schedules.tuesday}<br/>
                                                                    <b>{schedules.tuesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.wednesday_accept == 2) ? <div>
                                                                        {schedules.wednesday}<br/>
                                                                    <b>{schedules.wednesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                 {(schedules.thursday_accept == 2) ? <div>
                                                                        {schedules.thursday}<br/>
                                                                    <b>{schedules.thursday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.friday_accept == 2) ? <div>
                                                                        {schedules.friday}<br/>
                                                                    <b>{schedules.friday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
                                                        </td>
                                                        <td>
                                                                 {(schedules.saturday_accept == 2) ? <div>
                                                                        {schedules.saturday}<br/>
                                                                    <b>{schedules.saturday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
    
                                              
                                                        </td>
                                                        <td>
                                                                 {(schedules.sunday_accept == 2) ? <div>
                                                                        {schedules.sunday}<br/>
                                                                    <b>{schedules.sunday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                    <b style={{color: "red"}}>Declined</b> </div>: null}
    
    
                                                        </td>
                                                        <td>
                                                            {schedules.department}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            else if (this.state.view == "NotAccepted") {
                                                return (
                                                    <tr key={i}>
                                                        <td className="fullName">
                                                            {schedules.firstName} {schedules.lastName}
                                                        </td>
                                                        <td className="schedule">
                                                                  {(schedules.monday_accept == 0 && schedules.monday.length > 0) ? <div>
                                                                        {schedules.monday}<br/>
                                                                    <b>{schedules.monday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
                                                            
                                        
                                                            
                                                        </td>
                                                        <td>
                                                                  {(schedules.tuesday_accept == 0 && schedules.tuesday.length > 0) ? <div>
                                                                        {schedules.tuesday}<br/>
                                                                    <b>{schedules.tuesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.wednesday_accept == 0 && schedules.wednesday.length > 0) ? <div>
                                                                        {schedules.wednesday}<br/>
                                                                    <b>{schedules.wednesday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                 {(schedules.thursday_accept == 0 && schedules.thursday.length > 0) ? <div>
                                                                        {schedules.thursday}<br/>
                                                                    <b>{schedules.thursday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
    
                                                        </td>
                                                        <td>
                                                                  {(schedules.friday_accept == 0 && schedules.friday.length > 0) ? <div>
                                                                        {schedules.friday}<br/>
                                                                    <b>{schedules.friday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
                                                        </td>
                                                        <td>
                                                                 {(schedules.saturday_accept == 0 && schedules.saturday.length > 0) ? <div>
                                                                        {schedules.saturday}<br/>
                                                                    <b>{schedules.saturday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
    
                                              
                                                        </td>
                                                        <td>
                                                                 {(schedules.sunday_accept == 0 && schedules.sunday.length > 0) ? <div>
                                                                        {schedules.sunday}<br/>
                                                                    <b>{schedules.sunday_title}</b><br />
                                                                    <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                    <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
    
    
                                                        </td>
                                                        <td>
                                                            {schedules.department}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        } else {
                                            if(schedules.department == this.state.filter) {
                                                if(this.state.view == "all") {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fullName">
                                                                {schedules.firstName} {schedules.lastName}
                                                            </td>
                                                            <td className="schedule">
                                                                        <div>
                                                                            {schedules.monday}<br/>
                                                                        <b>{schedules.monday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.monday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.monday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.monday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
                                            
                                                                
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.tuesday}<br/>
                                                                        <b>{schedules.tuesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.tuesday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.tuesday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.tuesday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.wednesday}<br/>
                                                                        <b>{schedules.wednesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.wednesday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.wednesday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.wednesday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.thursday}<br/>
                                                                        <b>{schedules.thursday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.thursday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.thursday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.thursday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.friday}<br/>
                                                                        <b>{schedules.friday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.friday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.friday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.friday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.saturday}<br/>
                                                                        <b>{schedules.saturday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.saturday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.saturday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.saturday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
                                                  
                                                            </td>
                                                            <td>
                                                                        <div>
                                                                            {schedules.sunday}<br/>
                                                                        <b>{schedules.sunday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                        </div>
                                                                        {(schedules.sunday_accept == 1)?<b style={{color: "green"}}>Accepted</b>:(schedules.sunday_accept == 2) ? <b style={{color: "red"}}>Declined</b> : (schedules.sunday.length > 0) ? <b style={{color: "orange"}}>Not Accepted</b> : null}
        
        
                                                            </td>
                                                            <td>
                                                                {schedules.department}
                                                            </td>
                                                        </tr>
                                                    );
                                                } else if (this.state.view == "Accepted") {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fullName">
                                                                {schedules.firstName} {schedules.lastName}
                                                            </td>
                                                            <td className="schedule">
                                                                      {(schedules.monday_accept == 1) ? <div>
                                                                            {schedules.monday}<br/>
                                                                        <b>{schedules.monday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                                
                                            
                                                                
                                                            </td>
                                                            <td>
                                                                      {(schedules.tuesday_accept == 1) ? <div>
                                                                            {schedules.tuesday}<br/>
                                                                        <b>{schedules.tuesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.wednesday_accept == 1) ? <div>
                                                                            {schedules.wednesday}<br/>
                                                                        <b>{schedules.wednesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                     {(schedules.thursday_accept == 1) ? <div>
                                                                            {schedules.thursday}<br/>
                                                                        <b>{schedules.thursday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.friday_accept == 1) ? <div>
                                                                            {schedules.friday}<br/>
                                                                        <b>{schedules.friday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                            </td>
                                                            <td>
                                                                     {(schedules.saturday_accept == 1) ? <div>
                                                                            {schedules.saturday}<br/>
                                                                        <b>{schedules.saturday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                  
                                                            </td>
                                                            <td>
                                                                     {(schedules.sunday_accept == 1) ? <div>
                                                                            {schedules.sunday}<br/>
                                                                        <b>{schedules.sunday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
        
                                                            </td>
                                                            <td>
                                                                {schedules.department}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                else if (this.state.view == "Accepted") {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fullName">
                                                                {schedules.firstName} {schedules.lastName}
                                                            </td>
                                                            <td className="schedule">
                                                                      {(schedules.monday_accept == 1) ? <div>
                                                                            {schedules.monday}<br/>
                                                                        <b>{schedules.monday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                                
                                            
                                                                
                                                            </td>
                                                            <td>
                                                                      {(schedules.tuesday_accept == 1) ? <div>
                                                                            {schedules.tuesday}<br/>
                                                                        <b>{schedules.tuesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.wednesday_accept == 1) ? <div>
                                                                            {schedules.wednesday}<br/>
                                                                        <b>{schedules.wednesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                     {(schedules.thursday_accept == 1) ? <div>
                                                                            {schedules.thursday}<br/>
                                                                        <b>{schedules.thursday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.friday_accept == 1) ? <div>
                                                                            {schedules.friday}<br/>
                                                                        <b>{schedules.friday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
                                                            </td>
                                                            <td>
                                                                     {(schedules.saturday_accept == 1) ? <div>
                                                                            {schedules.saturday}<br/>
                                                                        <b>{schedules.saturday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
                                                  
                                                            </td>
                                                            <td>
                                                                     {(schedules.sunday_accept == 1) ? <div>
                                                                            {schedules.sunday}<br/>
                                                                        <b>{schedules.sunday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                        <b style={{color: "green"}}>Accepted</b> </div>: null}
        
        
                                                            </td>
                                                            <td>
                                                                {schedules.department}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                else if (this.state.view == "Declined") {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fullName">
                                                                {schedules.firstName} {schedules.lastName}
                                                            </td>
                                                            <td className="schedule">
                                                                      {(schedules.monday_accept == 2) ? <div>
                                                                            {schedules.monday}<br/>
                                                                        <b>{schedules.monday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
                                                                
                                            
                                                                
                                                            </td>
                                                            <td>
                                                                      {(schedules.tuesday_accept == 2) ? <div>
                                                                            {schedules.tuesday}<br/>
                                                                        <b>{schedules.tuesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.wednesday_accept == 2) ? <div>
                                                                            {schedules.wednesday}<br/>
                                                                        <b>{schedules.wednesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                     {(schedules.thursday_accept == 2) ? <div>
                                                                            {schedules.thursday}<br/>
                                                                        <b>{schedules.thursday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.friday_accept == 2) ? <div>
                                                                            {schedules.friday}<br/>
                                                                        <b>{schedules.friday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
                                                            </td>
                                                            <td>
                                                                     {(schedules.saturday_accept == 2) ? <div>
                                                                            {schedules.saturday}<br/>
                                                                        <b>{schedules.saturday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
        
                                                  
                                                            </td>
                                                            <td>
                                                                     {(schedules.sunday_accept == 2) ? <div>
                                                                            {schedules.sunday}<br/>
                                                                        <b>{schedules.sunday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                        <b style={{color: "red"}}>Declined</b> </div>: null}
        
        
                                                            </td>
                                                            <td>
                                                                {schedules.department}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                else if (this.state.view == "NotAccepted") {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="fullName">
                                                                {schedules.firstName} {schedules.lastName}
                                                            </td>
                                                            <td className="schedule">
                                                                      {(schedules.monday_accept == 0 && schedules.monday.length > 0) ? <div>
                                                                            {schedules.monday}<br/>
                                                                        <b>{schedules.monday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.monday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
                                                                
                                            
                                                                
                                                            </td>
                                                            <td>
                                                                      {(schedules.tuesday_accept == 0 && schedules.tuesday.length > 0) ? <div>
                                                                            {schedules.tuesday}<br/>
                                                                        <b>{schedules.tuesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.tuesday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.wednesday_accept == 0 && schedules.wednesday.length > 0) ? <div>
                                                                            {schedules.wednesday}<br/>
                                                                        <b>{schedules.wednesday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.wednesday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                     {(schedules.thursday_accept == 0 && schedules.thursday.length > 0) ? <div>
                                                                            {schedules.thursday}<br/>
                                                                        <b>{schedules.thursday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.thursday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
        
                                                            </td>
                                                            <td>
                                                                      {(schedules.friday_accept == 0 && schedules.friday.length > 0) ? <div>
                                                                            {schedules.friday}<br/>
                                                                        <b>{schedules.friday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.friday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
                                                            </td>
                                                            <td>
                                                                     {(schedules.saturday_accept == 0 && schedules.saturday.length > 0) ? <div>
                                                                            {schedules.saturday}<br/>
                                                                        <b>{schedules.saturday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.saturday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
        
                                                  
                                                            </td>
                                                            <td>
                                                                     {(schedules.sunday_accept == 0 && schedules.sunday.length > 0) ? <div>
                                                                            {schedules.sunday}<br/>
                                                                        <b>{schedules.sunday_title}</b><br />
                                                                        <div style={{width: 100 + "px", wordBreak: "break-all"}}><i>{schedules.sunday_des}</i></div>
                                                                        <b style={{color: "orange"}}>Not Accepted</b> </div>: null}
        
        
                                                            </td>
                                                            <td>
                                                                {schedules.department}
                                                            </td>
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
            );
        }
});

module.exports = ScheduleView;