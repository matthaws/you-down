import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewGroupLocation from "./new_group_location.jsx";
import NewGroupDescription from "./new_group_description.jsx";
import { createGroup } from "../../../actions/group_actions";
import hashHistory from "../../../util/history";
import NewGroupPic from "../../../packs/images/new_group_photo.jpeg";
import NameTagPic from "../../../packs/images/nametag.png";
import "./new_group.scss";

class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: new Set(),
      location: false,
      description: false,
      submit: false,
      group_name: "",
      location_zip: "",
      group_description: "",
      member_moniker: "",
      location_name: ""
    };
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
      const newcategories = this.state.selectedCategories;
      if (newcategories.has(e.target.id)) {
        newcategories.delete(e.target.id);
      } else {
        newcategories.add(e.target.id);
      }
      this.setState({ selectedCategories: newcategories });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const newGroup = {
      group_name: this.state.group_name,
      location_name: this.state.location_name,
      location_zip: this.state.location_zip,
      description: this.state.group_description,
      organizer_id: this.props.currentUserId,
      selectedCategories: Array.from(this.state.selectedCategories)
    };
    if (this.state.member_moniker !== "") {
      newGroup.member_moniker = this.state.member_moniker;
    }

    this.props.createGroup(newGroup);
  }

  update(property) {
    return e =>
      this.setState({
        [property]: e.target.value
      });
  }

  openDescription(e) {
    e.preventDefault();
    this.setState({ description: true });
  }

  openLocation(e) {
    e.preventDefault();
    this.setState({ location: true });
  }

  createCheckbox(category) {
    const checkvalue = this.state.selectedCategories.has(category);
    return (
      <div key={category} className="checkbox">
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
      </div>
    );
  }

  createCheckboxes() {
    const categories = [
      "Outdoors & Adventure",
      "Technology",
      "Learning",
      "Food & Drink",
      "Writing",
      "LGBTQ",
      "Book Clubs",
      "Pets",
      "Hobbies & Crafts",
      "Social",
      "Career & Business",
      "Games"
    ];
    return categories.map(this.createCheckbox);
  }

  render() {
    const checkboxes = this.createCheckboxes();

    return (
      <div>
        <div className="form-banner">
          <img src={NewGroupPic} />
          <h1>Start a new group</h1>
          <h2>Make fun stuff happen</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="new-group-form">
            <ul>
              <li>
                <ul className="form-section">
                  <li>
                    <img className="form-icon" src={NameTagPic} />
                  </li>
                  <li>
                    <h1>What should the name of your new group be?</h1>
                    <br />
                    <input
                      onChange={this.update("group_name")}
                      value={this.state.group_name}
                      type="text"
                    />
                  </li>
                  <li>
                    <button onClick={this.openLocation} className="form-button">
                      Next
                    </button>
                  </li>
                </ul>
              </li>
              {this.state.location ? (
                <NewGroupLocation
                  update={this.update}
                  openDescription={this.openDescription}
                  locationName={this.state.location_name}
                  locationZip={this.state.location_zip}
                />
              ) : (
                <div />
              )}
              {this.state.description ? (
                <NewGroupDescription
                  update={this.update}
                  groupDescription={this.state.group_description}
                  checkboxes={checkboxes}
                  memberMoniker={this.state.member_moniker}
                />
              ) : (
                <div />
              )}
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

NewGroupForm.propTypes = {
  currentUserId: PropTypes.integer,
  createGroup: PropTypes.func
};

const mapStateToProps = state => ({
  currentUserId: state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  createGroup: group =>
    dispatch(createGroup(group)).then(hashHistory.push(`/search`))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupForm);
