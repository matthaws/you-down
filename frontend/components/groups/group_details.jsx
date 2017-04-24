import React from 'react';
import { Link } from 'react-router';

class PicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {members: []}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({members: nextProps.members})
  }

  render() {
    let memberList = [];
    this.props.members.forEach( (member) => {
      let profile_pic = member.profile_pic;
      if (profile_pic === "/DEFAULT") {
        profile_pic = window.images.default_profile
      }
      if( memberList.length < 10) {
      memberList.push(<li key={member.id}><img src={profile_pic} className="small-thumb" /></li>)
    }
    })

    return (
      <ul>
        {memberList}
      </ul>
    );
  }
}


class GroupDetails extends React.Component{
  constructor(props){
    super(props);
  }

  render() {

    let eventList = [];
    if (this.props.events) {
      this.props.events.forEach( (event) => {
          let date = new Date(event.date).toLocaleDateString();
          let time = new Date(event.date).toLocaleTimeString();
              eventList.push(<li key={event.id} className="event-list-item"><ul>
          <Link to={`/events/${event.id}`} ><li><h2>{event.event_name}</h2></li></Link>
          <li><img src={window.images.location} /><h3><a href={`http://maps.google.com/?q=${event.location_address}`}>{event.location_name}<br />
            {event.location_address}</a></h3></li>
          </ul>
          <ul>
            <li>x attending</li>
            <li>{date}, {time}</li>
          </ul>
          </li>)
      });
    };


    return (
       <li><div className="show-main">
      <h1>About Us:</h1>
      {this.props.group.description}
      <div className="roll-call">
        <h1>We are a group of {this.props.members.length} {this.props.group.member_moniker}</h1>
        <PicList members={this.props.members} />
      </div>
    </div>
      <div className="event-list">
        <h1>Upcoming Events</h1>
        <ul>
          {eventList}
        </ul>
      </div>
        </li>
    )}
};

export default GroupDetails;
