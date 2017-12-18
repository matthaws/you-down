import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
  super(props);
  this.state = { isChecked: false }
  this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, label } = this.props;
    if (this.state.isChecked) {
      this.setState({isChecked: false})
    } else {
      this.setState({isChecked: true})
    };
  };

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <input
            type="checkbox"
            id={label}
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
                      />

      <label htmlFor={label}>
          <p>{label}</p>
        </label>
      </div>
    );
  }
}

export default Checkbox;
