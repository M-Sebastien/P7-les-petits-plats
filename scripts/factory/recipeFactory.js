import recipe_template from "../templates/recipe_template.js"

function recipeFactory(recipeContent) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = recipeContent;

    function getRecipesCardDOM() { 
        const article = document.createElement("article");
        article.setAttribute("class", ".recipe-card");
        article.innerHTML = recipe_template;

        article.querySelector("h2").innerText = name;
        article.querySelector(".time").innerText = `${time} min`;
        article.querySelector(".recipe-text").innerText = description;
        article.setAttribute("id", `${id}`);
        article.setAttribute("data-appliance", `${appliance}`);
        article.setAttribute("data-ustensils", `${ustensils}`);
        article.setAttribute("data-servings", `${servings}`);
    
        ingredients.forEach(ing => {
            const li = document.createElement("li");
            const ingredient = document.createElement("span");
            const quantity = document.createElement("span");
            const unit = document.createElement("span");

            ingredient.setAttribute("class", "ingredient");
            quantity.setAttribute("class", "quantity");
            unit.setAttribute("class", "unit");

            ingredient.innerText = ing.ingredient;
            quantity.innerText = ing.quantity !== undefined ? ` : ${ing.quantity}` : "";
            unit.innerText = ing.unit !== undefined ? ` ${ing.unit}` : "";

            li.appendChild(ingredient);
            li.appendChild( quantity);
            li.appendChild(unit);

            article.querySelector(".ingredients-list").appendChild(li);
        });  

        return article;            
    }

    return { getRecipesCardDOM }
}

export { recipeFactory }