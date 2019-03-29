import React, { Component } from "react";
import Navbar from "./Navbar";
import RecipeItem from "./RecipeItem";
import recipes from "../sample_data/recipes.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ""
    };
  }

  renderRecipes = () => {
    const { searchString } = this.state;
    const { recipes } = this;

    let newRecipes = [];

    if (searchString.length > 0) {
      recipes.forEach(recipe => {
        let foundInTitle = recipe.title
          .toLowerCase()
          .indexOf(searchString.toLowerCase());
        let foundInIngredients = recipe.ingredients
          .toLowerCase()
          .indexOf(searchString.toLowerCase());

        let newTitle;
        let newIngredients;
        let NR = false;
        if (foundInTitle > -1) {
          newTitle = (
            <span>
              {recipe.title.slice(0, foundInTitle)}
              <mark>
                {recipe.title.slice(
                  foundInTitle,
                  foundInTitle + searchString.length
                )}
              </mark>
              {recipe.title.slice(
                foundInTitle + searchString.length,
                recipe.title.length
              )}
            </span>
          );
          NR = true;
        } else {
          newTitle = recipe.title;
        }
        if (foundInIngredients > -1) {
          newIngredients = (
            <span>
              {recipe.ingredients.slice(0, foundInIngredients)}
              <mark>
                {recipe.ingredients.slice(
                  foundInIngredients,
                  foundInIngredients + searchString.length
                )}
              </mark>
              {recipe.ingredients.slice(
                foundInIngredients + searchString.length,
                recipe.ingredients.length
              )}
            </span>
          );
          NR = true;
        } else {
          newIngredients = recipe.ingredients;
        }
        if (NR) {
          newRecipes.push({
            title: newTitle,
            ingredients: newIngredients,
            thumbnail: recipe.thumbnail
          });
        }
      });
    }

    if (newRecipes.length < 1) {
      if (searchString.length > 0) {
        return <h1 style={{ margin: "auto" }}>No Results to show!</h1>;
      }
      newRecipes = recipes;
    }

    return newRecipes.map((recipe, i) => (
      <RecipeItem key={i} recipe={recipe} />
    ));
  };
  handleInputChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar
          handleInputChange={this.handleInputChange}
          searchString={this.state.searchString}
        />
        <div className="container mt-10">
          <div className="row">{this.renderRecipes()}</div>
        </div>
      </div>
    );
  }
}

export default App;
