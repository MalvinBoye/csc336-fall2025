import { useState } from 'react';
import MealItem from "./MealItem";
import "./App.css";

function Home() {
  const [meals, setMeals] = useState([
    {
      name: "Jollof Rice",
      ingredients: ["Rice", "Tomato","Onion","Pepper","Chicken","Stock"],
      favourite: true,
    },
    {
      name: "Kenkey and Tilapia",
      ingredients: ["Corn Dough", "Cassava Dough","Haboneros","Shrimps","Tomatoes"],
      favourite: false,
    }
  ]);

  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState("");

  function handleAddMeal() {
    if(mealName.trim() === "" || ingredients.trim() === "")
      return;
  

  const newMeal = {
    name: mealName,
    ingredients: ingredients.split(",").map ((i) => i.trim()),
    favourite:false,
  };

  setMeals([...meals, newMeal]);
  setMealName("");
  setIngredients("");
  
}

function toggleFavourite(index) {
  const updated =[...meals];
  updated[index].favourite = !updated[index].favourite;
  setMeals(updated);
}

  return(
    <div className="App">
      <h1 className="title">Your Boring Meals</h1>
      <p className="subtitle">Ingredients to Your favorite meals</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Meal name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients(comma seperated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleAddMeal}>Add Meal</button>
      </div>

      <div className="meal-list">
        {meals.map((meal, index) => (
          <MealItem
            key={index}
            meal={meal}
            onFavouriteToggle={() => toggleFavourite(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;