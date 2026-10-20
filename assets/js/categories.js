import { url } from './main.js';

const categoryList = [];
const categoryContainer = document.getElementById('category-container');

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const currentCategory = params.get('category')
    showCategories(currentCategory);
});

async function showCategories(currentCategory = null) {
    await getCategories();

    for (const category of categoryList) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        if (currentCategory === category.strCategory) {
            a.classList.add('current-category');
        }
        a.href = 'index.html?category=' + category.strCategory;
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