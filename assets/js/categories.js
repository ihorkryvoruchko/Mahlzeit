import { url } from './main.js';

const categoryList = [];
const categoryContainer = document.getElementById('category-container');

document.addEventListener('DOMContentLoaded', () => {
    showCategories();
});

async function showCategories() {
    await getCategories();
    
    for (const category of categoryList) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '../index.html?category=' + category.strCategory;
        a.textContent = category.strCategory;
        li.appendChild(a);
        categoryContainer.appendChild(li);
    }
}    
async function getCategories() {
    return fetch(url + 'categories.php' )
        .then(response => response.json())
        .then(data => {
            categoryList.push(...data.categories);
        });
}