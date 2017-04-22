import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateGroup } from '../../actions/group_actions';

class GroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: this.props.group.group_name,
      location_name: this.props.group.location_name,
      location_zip: this.props.group.location_zip,
      description: this.props.group.description,
      member_moniker: this.props.group.member_moniker,
      group_pic: this.props.group.group_pic
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleSubmit() {
    this.props.updateGroup(this.state)
  }

  render () {
    return (
    <li>
      <div className="group-edit">
        <h1> Edit Group Details: </h1>
        <ul>
          <li>Group Name:<br />
            <input type="text" value={this.state.group_name} onChange={this.update("group_name")} />
          </li>
          <li>Location:<br/>
            <input type="text" value={this.state.location_name} onChange={this.update("location_name")} />
          </li>
          <li>Home Zip Code:<br />
            <input type="text" value={this.state.location_zip} onChange={this.update("location_zip")} />
          </li>
          <li>Description:<br />
            <textarea value={this.state.description} onChange={this.update("description")} />
          </li>
          <li>Members known as:<br />
            <input type="text" value={this.state.member_moniker} onChange={this.update("member_monkier")} />
          </li>
          <li>Upload a new picture to represent your group: <br />
            <input type="file" onChange={this.update("group_pic")} /></li>
          <li>
            <button className="form-button" onClick={this.handleSubmit} >UPDATE THIS GROUP</button>
            <button className="form-button" >DELETE THIS GROUP</button></li>
        </ul>
      </div>
    </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  updateGroup: (group) => dispatch(updateGroup(group))
  };
}

export default connect(null, mapDispatchToProps)(GroupEdit);
