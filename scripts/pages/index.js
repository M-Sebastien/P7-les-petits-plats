/*async function getRecipes() {
    let url = "data/recipes.js"
    try {
        let response = await fetch(url);
        return await response.js();
    } catch (error) {
        console.error(error);
    }
}*/

import { recipeFactory } from "../factory/recipeFactory.js";
import activeFilter_template from "../templates/activeFilter_template.js"

// Gather parameters and save them inside an empty array
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];
// Selected tags/filters
let selectedTagsArray = [];


//console.log(recipes);
//
//
/* REMOVE THE ASYNC IN FRONT OF FUNCTION, REMOVE COMMENT AT THE END OF PROJECT ! */
//
//
function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");

    recipes.forEach((recipe) => {
        //console.log(recipe);

        const recipesModel = recipeFactory(recipe);

        const recipesCardDOM = recipesModel.getRecipesCardDOM();

        //console.log(recipesCardDOM);
        
        recipesSection.appendChild(recipesCardDOM);
        
        //Fill the 3 parameters arrays
        recipe.ingredients.map((element) => {
            ingredientsArray.push(element.ingredient);
        });

        appliancesArray.push(recipe.appliance);

        recipe.ustensils.map((element) => {
            ustensilsArray.push(element);
        });

        ingredientsArray = [...new Set(ingredientsArray)].sort();
        appliancesArray = [...new Set(appliancesArray)].sort();
        ustensilsArray = [...new Set(ustensilsArray)].sort();
    });
};


// Expand/shrink tags section
const chevronIcons = document.querySelectorAll(".fa-chevron-down")

chevronIcons.forEach((item) => {
    item.addEventListener("click", () => {
        if (item.parentElement.classList.contains("expanded")) {
            removeClass();
        } else {
            removeClass();
            item.parentElement.classList.add("expanded");
            //Add filters tags elements
            switch (item.parentElement.classList.value) {
                case "filter ingredients-filter expanded":
                    addInTagsList("ingredients", ingredientsArray);
                    selectedTags("ingredients");
                    break;
                case "filter device-filter expanded":
                    addInTagsList("device", appliancesArray);
                    selectedTags("device");
                    break;
                case "filter utensil-filter expanded":
                    addInTagsList("utensil", ustensilsArray);
                    selectedTags("utensil");
                    break;
            
                default:
                    break;
            }
        }
    })
});

document.addEventListener("click", (e) => {
    if (!e.target.parentElement.classList.contains("expanded")) {
        removeClass();
    }
})

function removeClass() {
    chevronIcons.forEach((item) => {
        item.parentElement.classList.remove("expanded");
    })
}

function addInTagsList(filter, data) {
    const tagsList = document.querySelector(`.filter_${filter}-list `);
    tagsList.innerHTML = ""; // Reset tags
    data.forEach(tag => { // Insert tag
        const li = document.createElement("li");
        li.setAttribute('class','tag');
        li.innerText = tag;
        tagsList.appendChild(li);
    })
}


// Display active filter / tag
function selectedTags(filter) {
    const tags = document.querySelectorAll(".tag");
    // console.log()
    //console.log(tags);
    
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            selectedTagsArray.push(tag.innerText);
            //console.log(selectedTagsArray);

            const tag_class = tag.innerText.replaceAll(' ', '_');
            const div = document.createElement("div");
            div.innerHTML = activeFilter_template;
            div.classList.add(`${filter}_active-filter`, tag_class);
            div.querySelector(".filter-name").innerText = tag.innerText;
            document.querySelector('.active-filters').appendChild(div);

            const closeBtn = document.querySelectorAll(".circle-xmark");
            //console.log(closeBtn);
            //if (closeBtn == null) {
                closeBtn.forEach((button) => { 
                    button.addEventListener("click", () => {
                        //if (typeof(button.parentNode) != 'undefined' && button.parentNode != null){
                            //console.log(button.parentNode);
                            button.parentNode.remove();
                            //document.querySelector('.active-filters').removeChild(button.parentNode);
                            //console.log(button.parentNode);
                        //}
                    })
                    //console.log(button.parentNode);
                })
            //}
        })
    })
}


//async function closeBtn() {
//    const closeBtn = document.querySelector(".circle-xmark");
//    console.log(closeBtn);
//    if (closeBtn == null) {
//        closeBtn.addEventListener("click", () => {
//            document.querySelector('.active-filters').removeChild(div);
//        })
//   }
//}


//
//
/* REMOVE THE ASYNC IN FRONT OF FUNCTION, REMOVE COMMENT AT THE END OF PROJECT ! */
//
//
function init() {
    displayData(recipes);
    //console.log(ingredientsArray);
    //console.log(appliancesArray);
    //console.log(ustensilsArray);
};

init();




// recherche avec le champ principal

const searchBar = document.getElementById('search-bar');

// searchBar.addEventListener("change", changeHandler, false);

searchBar.addEventListener('input', function() { 
    //console.log(searchBar.value);
    //console.log(searchBar.value.length);
    //console.log(recipes[0]);
    if (searchBar.value.length >= 3) {
        inputSearch(searchBar.value, recipes);
    }
});

// fonction de recherche par mot clé
function inputSearch(keyWord, data) {
    let dataArray = [];
    let newIng = "";
    let extraArray = [];

    for (let i in data) {
        //data array global, puis mapper dessus en ajoutant tous les objets en string
        dataArray.push(data[i].ingredients);

        for (let j in data[i].ingredients) {
            extraArray = dataArray.map(ingredients => {
                extraArray.push(data[i].ingredients[j].ingredient);
            })
            //dataArray.push(data[i].ingredients[j].ingredient);
        }
        //console.log(data[i].ingredients.join('_'));
    }
    //console.log(keyWord);
}

// Ajout de chaque data[i].ingredients dans un tableau, en les transformant en une string.
// Le tableau sera donc de data.length objets.
// Comparer searchBar.value avec les objets.
// Si true garder le data[i] et exclure les data[i] false. 
