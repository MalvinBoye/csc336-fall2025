import {useState} from "react";
import heartIcon from "./assets/heart-svgrepo-com.svg";
import IngredientTag from "./IngredientTag";


function MealItem({meal, onFavouriteToggle}) {
    const [showIngredients, setShowIngredients] = useState(false);

    return (
        <div
            className={`meal-item ${meal.favourite ? "favourite" : ""}`}
            onClick={()=> setShowIngredients(!showIngredients)}
        >
        <div className="meal-header">
            <h2>{meal.name}</h2>
            <button
                className="fav-btn"
                onClick={(e)=> {
                    e.stopPropagation();
                    onFavouriteToggle();
                }}
            >
                <img
                    src={heartIcon}
                    alt="favourite"
                    className={`heart-icon ${meal.favourite ? "active" : ""}`}
                />
            </button>
        </div>

        {showIngredients ? (
            <div className="ingredients">
                {meal.ingredients.map((ingredient, index) => (
                    <IngredientTag key={index} ingredient={ingredient} />
                ))}
            </div>
        ) : (
            <p className="click-hint">(click to reveal ingredients)</p>
        )}
    </div>
    );
}

export default MealItem;