import { url } from './main.js';

const dishImage = document.getElementById('dish-image');
const dishCountry = document.getElementById('dish-country');
const dishCategory = document.getElementById('dish-category');
const dishTitle = document.getElementById('dish-title');
const dishIngredients = document.getElementById('dish-ingredients');
const dishInstructions = document.getElementById('dish-instructions-container')
const dishVideo = document.getElementById('dish-video-link')

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dishId = params.get('id');

    
    getDish(dishId).then(dish => {
            showDishDetails(dish);
        });
});

function showDishDetails(dish) {
    dishImage.src = dish.strMealThumb;
    dishImage.alt = dish.strMeal;
    dishCountry.textContent = dish.strArea;
    dishCategory.textContent = dish.strCategory;
    dishTitle.textContent = dish.strMeal;
    dishVideo.href = dish.strYoutube

    const ingredientsList = getKeysStartingWith(dish, 'strIngredient');
    
    for (let i = 1; i <= ingredientsList.length; i++) {
        const ingredient = dish[`strIngredient${i}`];
        const measure = dish[`strMeasure${i}`];
        if (ingredient) {
            const zutatenLi = document.createElement('li');
            zutatenLi.textContent = ingredient + ' - ' + measure;
            dishIngredients.appendChild(zutatenLi);
        }
    }
    
    schowDishInstructions(dish)
}


async function getDish(dishId) {
    const path = dishId ? 'lookup.php?i=' + dishId : 'random.php'
    return fetch(url + path)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.meals[0];
        });
}

function getKeysStartingWith(obj, prefix = "strIngredient") {
    return Object.keys(obj).filter(key => key.startsWith(prefix));
}

function schowDishInstructions(dish) {
    const dishInstructionsArray = dish.strInstructions.split(". ")

    for (let i = 0; i < dishInstructionsArray.length; i++) {
        const div = document.createElement("div")
        div.classList.add("dish-instructions")

        const divNumber = document.createElement("div")
        divNumber.classList.add("dish-instructions-number")
        divNumber.textContent = i + 1

        const divText = document.createElement("p")
        divText.textContent = dishInstructionsArray[i]
        div.appendChild(divNumber)
        div.appendChild(divText)
        
        dishInstructions.appendChild(div)
    }
}