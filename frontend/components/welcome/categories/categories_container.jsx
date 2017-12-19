import React from "react";
import Category from "./category.jsx";
import Outdoors from "../../../packs/images/outdoors.jpg";
import Bookclub from "../../../packs/images/bookclub.jpg";
import Business from "../../../packs/images/business.jpg";
import Crafts from "../../../packs/images/crafts.jpg";
import Food from "../../../packs/images/food.jpg";
import Games from "../../../packs/images/games.jpg";
import Learning from "../../../packs/images/learning.jpg";
import Lgbt from "../../../packs/images/lgbt.jpg";
import Social from "../../../packs/images/social.jpg";
import Tech from "../../../packs/images/tech.jpg";
import Writing from "../../../packs/images/writing.jpg";
import Pets from "../../../packs/images/pets.jpg";

import "./category.css";

const CategoryContainer = () => (
  <ul className="category-list">
    <Category path="/search/outdoors" image={Outdoors} title="Outdoors" />
    <Category path="/search/tech" image={Tech} title="Technology" />
    <Category path="/search/learning" image={Learning} title="Learning" />
    <Category path="/search/food" image={Food} title="Food & Drink" />
    <Category path="/search/writing" image={Writing} title="Writing" />
    <Category path="/search/games" image={Games} title="Games" />
    <Category path="/search/lgbtq" image={Lgbt} title="LGBTQ" />
    <Category path="/search/books" image={Bookclub} title="Books" />
    <Category path="/search/pets" image={Pets} title="Pets" />
    <Category path="/search/crafts" image={Crafts} title="Hobbies/Crafts" />
    <Category path="/search/social" image={Social} title="Social" />
    <Category path="/search/career" image={Business} title="Career" />
  </ul>
);

export default CategoryContainer;
