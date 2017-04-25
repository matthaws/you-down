import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './checkbox';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/group_actions';
import { hashHistory } from 'react-router';


class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategories: new Set(), location: false, description: false, submit: false, group_name: "", location_zip: "", group_description: "", member_moniker: "", location_name: "" }
    this.openLocation = this.openLocation.bind(this);
    this.openDescription = this.openDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.createCheckboxes = this.createCheckboxes.bind(this);
    this.createCheckbox = this.createCheckbox.bind(this);

  }

  toggleCheckbox(e) {
    if (this.state.selectedCategories) {
    let newcategories = this.state.selectedCategories;
    if (newcategories.has(e.target.id)) {
      newcategories.delete(e.target.id)
    } else {
      newcategories.add(e.target.id)
    }
    this.setState({selectedCategories: newcategories});
  }
  }

  handleSubmit(e) {
    e.preventDefault();
    let newGroup = {
      group_name: this.state.group_name,
      location_name: this.state.location_name,
      location_zip: this.state.location_zip,
      description: this.state.group_description,
      organizer_id: this.props.currentUserId,
      selectedCategories: Array.from(this.state.selectedCategories)
    }
     if (this.state.member_moniker !== "") {
      newGroup.member_moniker = this.state.member_moniker
    }

    this.props.createGroup(newGroup);
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  openDescription(e) {
    e.preventDefault()
    this.setState({description: true})
  }

  openLocation(e) {
    e.preventDefault()
    this.setState({location: true})
  }

  createCheckbox(category) {
      let checkvalue = this.state.selectedCategories.has(category)
    return (  <div key={category} className="checkbox">
        <input
            type="checkbox"
            id={category}
            value={category}
            checked={checkvalue}
            onChange={this.toggleCheckbox}
                      />

        <label htmlFor={category}>
          <p>{category}</p>
        </label>
      </div>)
}

  createCheckboxes() {
    const categories = ["Outdoors & Adventure", "Tech", "Learning", "Food & Drink", "Writing", "LGBTQ", "Book Clubs", "Pets", "Hobbies & Crafts", "Social", "Career & Business", "Games"]
    return categories.map(this.createCheckbox);
  }

  render() {
    let checkboxes = this.createCheckboxes();
    let location_section = (<div />)
    if (this.state.location === true) {
      location_section = (
        <li>
          <ul className="form-section">
            <li><img className="form-icon" src={window.images.location} /></li>
            <li><h1>In what city or region will the group be focused?</h1>
            <br /><input type="text" onChange={this.update("location_name")} value={this.state.location_name} />

            <h2>Around which zip code will your group be based?</h2><br />
            <input type="text"
                onChange={this.update("location_zip")}
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
            <br /><textarea onChange={this.update("group_description")} value={this.state.group_description} />
            <br /><h2>What category or categories does your group fall into?</h2>
            <br /><div className="checkboxes">{checkboxes}</div>
            <br /><h2>What should members of your group be called?</h2>
            <br /><h3>(If you leave this blank, we'll just call them 'members')</h3>
            <br /><input type='text' onChange={this.update("member_moniker")} value={this.state.member_moniker} />
            </li>
          </ul>
          <div className="submit-button">
            <button className="form-button" type="submit">Create Your Group!</button>
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
      <form onSubmit={this.handleSubmit}>
      <div className = "new-group-form">
        <ul>
          <li>
            <ul className="form-section">
              <li><img className="form-icon" src={window.images.nametag} /></li>
              <li><h1>What should the name of your new group be?</h1><br />
                <input onChange={this.update("group_name")}
                  value={this.state.group_name}
                  type="text"></input></li>
              <li><button onClick={this.openLocation} className="form-button">Next</button></li>
          </ul>

          </li>
          {location_section}
          {description_section}
        </ul>
      </div>
        </form>
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
    createGroup: (group) => dispatch(createGroup(group)).then( hashHistory.push(`/search`))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupForm);
