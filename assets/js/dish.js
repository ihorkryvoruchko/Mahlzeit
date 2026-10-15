import { url } from './main.js';

const dishImage = document.getElementById('dish-image');
const dishCountry = document.getElementById('dish-country');
const dishCategory = document.getElementById('dish-category');
const dishTitle = document.getElementById('dish-title');

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dishId = params.get('id');

    if (dishId) {
        getDish(dishId).then(dish => {
            showDishDetails(dish);
        });
    }
});

function showDishDetails(dish) {
    dishImage.src = dish.strMealThumb;
    dishImage.alt = dish.strMeal;
    dishCountry.textContent = dish.strArea;
    dishCategory.textContent = dish.strCategory;
    dishTitle.textContent = dish.strMeal;

    const ingredientsList = getKeysStartingWith(dish, 'strIngredient');
    console.log(ingredientsList);
    for (let i = 1; i <= ingredientsList.length; i++) {
        const ingredient = dish[`strIngredient${i}`];
        const measure = dish[`strMeasure${i}`];
        if (ingredient) {
            const zutatenLi = document.createElement('li');
            zutatenLi.textContent = ingredient + ' - ' + measure;
            document.getElementById('dish-ingredients').appendChild(zutatenLi);
        }
    }
    

}


async function getDish(dishId) {
    return fetch(url + 'lookup.php?i=' + dishId)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data.meals[0];
        });
}

function getKeysStartingWith(obj, prefix = "strIngredient") {
    return Object.keys(obj).filter(key => key.startsWith(prefix));
}