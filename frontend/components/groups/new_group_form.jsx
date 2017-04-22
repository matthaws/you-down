import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/group_actions';
import { hashHistory } from 'react-router';


class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: false, description: false, submit: false, group_name: "", location_zip: "", group_description: "", member_moniker: "", location_name: "" }
    this.openLocation = this.openLocation.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.openDescription = this.openDescription.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMonikerChange = this.handleMonikerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocationNameChange = this.handleLocationNameChange.bind(this);
  }

  handleSubmit() {
    let newGroup = {
      group_name: this.state.group_name,
      location_name: this.state.location_name,
      location_zip: this.state.location_zip,
      description: this.state.group_description,
      organizer_id: this.props.currentUserId
    }
     if (this.state.member_moniker !== "") {
      newGroup.member_moniker = this.state.member_moniker
    }

    this.props.createGroup(newGroup);
  }

  handleLocationNameChange(e) {
    this.setState({location_name: e.target.value})
  }

  handleLocationChange (e) {
    this.setState({location_zip: e.target.value})
  }
  handleNameChange(e) {
    this.setState({group_name: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({group_description: e.target.value})
  }

  handleMonikerChange(e) {
    this.setState({member_moniker: e.target.value})
  }

  openDescription() {
    this.setState({description: true})
  }

  openLocation() {
    this.setState({location: true})
  }

  render() {
    let location_section = (<div />)
    if (this.state.location === true) {
      location_section = (
        <li>
          <ul className="form-section">
            <li><img className="form-icon" src={window.images.location} /></li>
            <li><h1>In what city or region will the group be focused?</h1>
            <br /><input type="text" onChange={this.handleLocationNameChange} value={this.state.location_name} />

            <h2>Around which zip code will your group be based?</h2><br />
            <input type="text"
                onChange={this.handleLocationChange}
                value={this.state.location_zip}/>
            </li>
            <li><button onClick={this.openDescription} className="form-button">Next</button></li>
          </ul>
        </li>
      )
    }
    let description_section = (<div />)
    if (this.state.description === true) {
      description_section = (
        <li>
          <ul className="form-section">
            <li><img className="form-icon" src={window.images.members} /></li>
            <li><h1>Describe what your group is about and who should join!</h1>
            <br /><textarea onChange={this.handleDescriptionChange} value={this.state.group_description} />
            <br /><h2>What should members of your group be called?</h2>
            <br /><h3>(If you leave this blank, we'll just call them 'members')</h3>
            <br /><input type='text' onChange={this.handleMonikerChange} value={this.state.member_moniker} />
            </li>
            <li></li>
          </ul>
          <div className="submit-button">
            <button className="form-button" onClick={this.handleSubmit}>Create Your Group!</button>
          </div>
        </li>
      )
    }
    return (
    <div>
      <div className = "form-banner"><img src={window.images.new_group} />
      <h1>Start a new group</h1>
      <h2>Make fun stuff happen</h2>
      </div>
      <div className = "new-group-form">
        <ul>
          <li>
            <ul className="form-section">
              <li><img className="form-icon" src={window.images.nametag} /></li>
              <li><h1>What should the name of your new group be?</h1><br />
                <input onChange={this.handleNameChange}
                  value={this.state.group_name}
                  type="text"></input></li>
              <li><button onClick={this.openLocation} className="form-button">Next</button></li>
          </ul>

          </li>
          {location_section}
          {description_section}
        </ul>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.session.currentUser.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: (group) => dispatch(createGroup(group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupForm);
