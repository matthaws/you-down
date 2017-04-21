import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createUser } from '../../actions/group_actions';

class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: false, description: false, submit: false }
    this.openLocation = this.openLocation.bind(this);
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
            <li><h1>Around which zip code will your group be based?</h1><br />
            <input type="text" />
            </li>
            <li><button onClick={this.openLocation} className="form-button">Next</button></li>
          </ul>
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
              <li><h1>What should the name of your new group be?</h1><br /><input type="text"></input></li>
              <li><button onClick={this.openLocation} className="form-button">Next</button></li>
          </ul>

          </li>
          {location_section}
        </ul>
      </div>
    </div>
    );
  }
}

export default NewGroupForm;
