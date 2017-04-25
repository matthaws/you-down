import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createEvent, updateEvent, deleteEvent } from '../../actions/event_actions';
import { hashHistory } from 'react-router';

class NewEventForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.formType === "new") {
      this.state = { location_name: "", date: "", location_address: "", location_zip: "", description:"", event_name: ""}
    } else {
      this.state = this.props.event
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.deleteEvent(this.props.eventId)
    hashHistory.push(`/groups/${this.props.event.group.id}`);
  }

  handleSubmit() {
    let newEvent = {
      date: this.state.date,
      event_name: this.state.event_name,
      location_name: this.state.location_name,
      location_zip: this.state.location_zip,
      location_address: this.state.location_address,
      description: this.state.description
    };
    if (this.props.formType === "new") {
      newEvent.organizer_id = this.props.currentUser.id
      newEvent.group_id = this.props.groupId

      this.props.createEvent(newEvent)
      hashHistory.push(`/groups/${this.props.eventId}`)
    } else {
      this.props.updateEvent(newEvent, this.props.eventId)
      this.props.changeLocation("home");
    }
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  render () {
    let headertext = this.props.formType === "new" ? "Create a New Event" : "Edit Event";
    let buttonText = this.props.formType === "new" ? "Create this event!" : "Update this event!"
    let deleteButton = (<div />)
    if (this.props.formType === "edit") {
      deleteButton = (<button onClick={this.handleDelete} className="form-button">Delete This Event</button>);
    }
    return (
    <li>
      <div className="group-edit">
        <h1> {headertext}: </h1>
        <ul>
          <li>Event Date: <br/>
            <input type="datetime-local" value={this.state.date} onChange={this.update("date")} />
          </li>
          <li>Event Name:<br />
            <input type="text" value={this.state.event_name} onChange={this.update("event_name")} />
          </li>
          <li>Location Name:<br/>
            <input type="text" value={this.state.location_name} onChange={this.update("location_name")} />
          </li>
          <li>Location Address:<br />
            <input type="text" value={this.state.location_address} onChange={this.update("location_address")} />
          </li>
          <li>Location Zip Code:<br />
            <input type="text" value={this.state.location_zip} onChange={this.update("location_zip")} />
          </li>
          <li>Description:<br />
            <textarea value={this.state.description} onChange={this.update("description")} />
          </li>
            <button className="form-button" onClick={this.handleSubmit} >{buttonText}</button>
            {deleteButton}
      </ul>
      </div>
    </li>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  errors: state.session.errors
})

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event) => dispatch(createEvent(event)).then( (event) => hashHistory.push(`/events/${event.id}`)),
    updateEvent: (event, eventId) => dispatch(updateEvent(event, eventId)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEventForm);
