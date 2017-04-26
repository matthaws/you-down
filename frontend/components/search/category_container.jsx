import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchAllGroups } from '../../actions/group_actions';
import { Link } from 'react-router';
import GroupSearch from './group_search';
import categoryTitles from '../../util/category_util';

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {category: this.props.params.category, title: ""}
  }

  componentWillMount() {

    const categoryTitles =  {
          "food": "Food & Drink",
          "outdoors": "Outdoors & Adventure",
          "tech": "Technology",
          "learning": "Learning",
          "writing": "Writing",
          "lgbtq": "LGBTQ",
          "games": "Games",
          "books": "Book Clubs",
          "pets": "Pets",
          "crafts": "Hobbies & Crafts",
          "social": "Social",
          "career": "Career & Networking"
        }
    this.setState({title: categoryTitles[this.state.category]});
  }

  render() {


    return (
      <div className="category-main">
        <div className="category-header">
          <h1>{this.state.title} groups</h1>
        </div>
        <GroupSearch hidden="false" category={this.state.title} />
      </div>

    )
  }
}


export default CategoryContainer;
