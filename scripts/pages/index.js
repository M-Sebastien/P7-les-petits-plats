import { recipeFactory } from "../factory/recipeFactory.js";
import activeFilter_template from "../templates/activeFilter_template.js"

// Gather parameters and save them inside an empty array
let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];
// Selected tags/filters
let selectedTagsArray = [];


//console.log(recipes);

function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
    recipesSection.innerHTML = "";

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
    //console.log(tags);
    
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            selectedTagsArray.push(tag.innerText.toLowerCase());
            //console.log(selectedTagsArray);

            const tag_class = tag.innerText.replaceAll(' ', '_');
            const div = document.createElement("div");
            div.innerHTML = activeFilter_template;
            div.classList.add(`${filter}_active-filter`, tag_class);
            div.querySelector(".filter-name").innerText = tag.innerText;
            document.querySelector('.active-filters').appendChild(div);

            // getRecipesByIndex(recipes, tag.innerText);
            console.log(selectedTagsArray);

            const closeBtn = document.querySelectorAll(".circle-xmark");
                closeBtn.forEach((button) => { 
                    button.addEventListener("click", (e) => {
                        // console.log(closeBtn.value);
                        let pos = selectedTagsArray.indexOf(e.target.parentNode)
                        selectedTagsArray.splice(pos, 1);
                        console.log(selectedTagsArray);
                        
                        button.parentNode.remove();
                    })
                })
            })
    })
}


function init() {
    displayData(recipes);
    //console.log(ingredientsArray);
    //console.log(appliancesArray);
    //console.log(ustensilsArray);
};

init();



// Main search-bar

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', () => { 
    if (searchBar.value.length >= 3) {
        getRecipesByIndex(recipes, searchBar.value);
    } else {
        displayData(recipes)
    }
});

// Formating data
function formatData(data) {
    let dataArray = [];
    let newIng = "";

    for (let i in data) {
        for (let j in data[i].ingredients) {
            newIng = newIng+' '+data[i].ingredients[j].ingredient
        }
        dataArray.push(data[i].name.toLowerCase()+" "+data[i].description.toLowerCase()+''+newIng.toLowerCase())
        newIng = "";
    }
        return dataArray;
}

// Recipe's index search
function searchInputTabIndex(data, keyWord){
    let dataRecipes = formatData(data);
    let indexRecipesSearch = [];

    dataRecipes.forEach((element, index) => {
        let results = element.includes(keyWord.toLowerCase());
        if (results == true) {
            indexRecipesSearch.push(index);
        }
    });
    // console.log(indexRecipesSearch);

    return indexRecipesSearch;
}

// Return recipes through index search
function getRecipesByIndex(data, keyWord){
    let dataIndex = searchInputTabIndex(data, keyWord);
    let recipesSearch = [];

    dataIndex.forEach((index) => {
        recipesSearch.push(data[index]);
    });

    console.log(recipesSearch);

    ingredientsArray = [];
    appliancesArray = [];
    ustensilsArray = [];

    displayData(recipesSearch)
    
}

// Search and update of showing recipes with tags only
// Search with input area in tags section
