import { url } from './main.js'

const dishList = []
const dishContainer = document.getElementById('dish-container')
const dishHeaderContainer = document.getElementById('dish-header')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const category = params.get('category')
    const search = params.get('search')
    const area = params.get('area')
    const country = params.get('country')

    showDishes(category, search, area, country)
})

searchButton.addEventListener("click", (event) => {
    document.location.href = `index.html?search=${searchInput.value}`
})

async function showDishes(category, search, area, country) {
    if (category) {
        dishHeaderContainer.textContent = `${category} Gerichte`
    } else if (area) {
        dishHeaderContainer.textContent = `${area} Gerichte`
    }

    await getDishes(category, search, country)

    for (const dish of dishList) {
        const div = document.createElement('div')
        div.classList.add('gericht-card')

        div.appendChild(createImg(dish))
        div.appendChild(createCountryCategoryList(dish))
        div.appendChild(createHeader(dish))
        div.appendChild(createLink(dish))

        dishContainer.appendChild(div)
    }
} 

function createImg(dish) {
    const img = document.createElement('img')
    img.src = dish.strMealThumb + '/small'
    img.alt = dish.strMeal

    return img
}

function createCountryCategoryList(dish) {
    const ul = document.createElement('ul')
    ul.classList.add('dish-country-and-categorien-list')
        
    const liCountry = document.createElement('li')
    liCountry.textContent = dish.strCountry
    ul.appendChild(liCountry)

    if (dish.strCategory) {
        for (const category of dish.strCategory.split(',')) {
            const li = document.createElement('li')
            li.textContent = category.trim()
            ul.appendChild(li)
        }
    }

    return ul
}

function createHeader(dish) {
    const header = document.createElement('h4')
        header.classList.add('dish-title')
        header.textContent = dish.strMeal
    
        return header
}

function createLink(dish) {
    const link = document.createElement('a')
        link.href = 'dish.html?id=' + dish.idMeal
        link.classList.add('dish-link')
        link.textContent = 'Rezept ansehen ->'

    return link
}
   
async function getDishes(category = null, search = null, country = null) {
    let path = 'search.php?s=a'
    
    if (category) {
        path = `filter.php?c=${category}`
    } else if (search) {
        path = 'search.php?s=' + search
    } else if (country) {
        path = `filter.php?a=${country}`
    }
    
    return fetch(url + path)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dishList.push(...data.meals)
        })
}