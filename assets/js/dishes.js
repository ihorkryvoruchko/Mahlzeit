import { url } from './main.js';

const dishList = [];
const dishContainer = document.getElementById('dish-container');

document.addEventListener('DOMContentLoaded', () => {
    showDishes();
});

async function showDishes() {
    await getDishes();
    console.log(dishList);
    for (const dish of dishList) {
        const div = document.createElement('div');
        div.classList.add('gericht-card');

        const img = document.createElement('img');
        img.src = dish.strMealThumb + '/small';
        img.alt = dish.strMeal;
        div.appendChild(img);

        const ul = document.createElement('ul');
        ul.classList.add('dish-country-and-categorien-list');
        
        const liCountry = document.createElement('li');
        liCountry.textContent = dish.strCountry;
        ul.appendChild(liCountry);

        for (const category of dish.strCategory.split(',')) {
            const li = document.createElement('li');
            li.textContent = category.trim();
            ul.appendChild(li);
        }

        div.appendChild(ul);
        const h4 = document.createElement('h4');
        h4.classList.add('dish-title');
        h4.textContent = dish.strMeal;
        div.appendChild(h4);

        const link = document.createElement('a');
        link.href = '/dish.html?id=' + dish.idMeal;
        link.classList.add('dish-link');
        link.textContent = 'Rezept ansehen ->';
        div.appendChild(link);

        dishContainer.appendChild(div);
    }
} 
   
async function getDishes() {
    return fetch(url + 'search.php?s=a' )
        .then(response => response.json())
        .then(data => {
            dishList.push(...data.meals);
        });
}