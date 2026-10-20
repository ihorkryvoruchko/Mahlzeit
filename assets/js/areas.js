import { url } from './main.js'

const areaContainer = document.getElementById('area-container')
const areaList = []

document.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search)
    const currentArea = urlParams.get('area')

    showAreas(currentArea);
})

areaContainer.addEventListener('change', (event) => {
    document.location.href = `index.html?area=${event.target.options[event.target.selectedIndex].text}&country=${event.target.value}`
})

function showAreas(currentArea = null) {
    getAreas().then(() => {
        for (const area of areaList) {
            const option = document.createElement('option')
            option.value = area.strCountry
            option.textContent = area.strArea

            if (area.strArea === currentArea || area.strCountry === currentArea) {
                option.selected = true;
            }

            areaContainer.appendChild(option)
        }
    })
}

async function getAreas() {
    return fetch(url + 'list.php?a=list')
        .then(response => response.json())
        .then(data => {
            areaList.push(...data.meals)
        })
}