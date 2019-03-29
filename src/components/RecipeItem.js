import React from "react";

const RecipeItem = props => {
  console.log(props);

  return (
    <div className="col-sm-3 mt-4">
      <div className="card">
        <img
          className="card-img-top img-fluid"
          alt={props.recipe.title}
          src={props.recipe.thumbnail}
        />
        <div className="card-body">
          <h5 className="card-title">{props.recipe.title}</h5>
          <p className="card-text">
            <strong>Ingredients: </strong>
            {props.recipe.ingredients}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
