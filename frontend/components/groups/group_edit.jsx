import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateGroup, deleteGroup } from '../../actions/group_actions';
import { hashHistory } from 'react-router';

class GroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: this.props.group.group_name,
      location_name: this.props.group.location_name,
      location_zip: this.props.group.location_zip,
      description: this.props.group.description,
      member_moniker: this.props.group.member_moniker,
      group_pic: "NONE",
      id: this.props.group.id
    }

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePicFile = this.updatePicFile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  updatePicFile(e) {
    this.setState({group_pic: e.currentTarget.files[0]});
  }

  handleDelete() {
    this.props.deleteGroup(this.state.id)
    hashHistory.push(`/users/${this.props.group.organizer.id}`)
  }

  handleSubmit() {
    let form = new FormData();
    form.append("group[id]", this.state.id);
    form.append("group[group_name]", this.state.group_name);
    form.append("group[location_name]", this.state.location_name);
    form.append("group[location_zip]", this.state.location_zip);
    form.append("group[description]", this.state.description);
    form.append("group[member_moniker]", this.state.member_moniker);
      if (this.state.group_pic !== "NONE") {
        form.append("group[group_pic]", this.state.group_pic);
      }
    this.props.updateGroup(form);
    this.props.goHome();
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
            <input type="file" onChange={this.updatePicFile} /></li>
          <li>
            <button className="form-button" onClick={this.handleSubmit} >UPDATE THIS GROUP</button>
            <button className="form-button" onClick={this.handleDelete} >DELETE THIS GROUP</button></li>
        </ul>
      </div>
    </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  updateGroup: (group) => dispatch(updateGroup(group)),
  deleteGroup: (groupId) => dispatch(deleteGroup(groupId))
  };
}

export default connect(null, mapDispatchToProps)(GroupEdit);
