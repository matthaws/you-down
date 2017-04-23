import React from 'react';

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
      memberList.push(<li key={member.id}><img src={profile_pic} className="small-thumb" /></li>)
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
    let joinButton = (
      <button onClick={this.joinGroup}></button>
    )
    return (
       <li><div className="show-main">
      <h1>About Us:</h1>
      {this.props.group.description}
      <div className="roll-call">
        <h1>We are a group of {this.props.members.length} {this.props.group.member_moniker}</h1>
        <PicList members={this.props.members} />
      </div>
    </div></li>
    )}
};

export default GroupDetails;
