import test from '../temporary/test.js';
const meals = test.recipes;
let i = 0;
const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('modal');

function addList() {
    modalContent.insertAdjacentHTML('beforeend',
        `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
}


function testt() {
    const list = document.getElementById('randomRecpiesList');
    list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + meals[i].title + '</li>' +
        '<a href="#" class="randomRecpiesList__href">Show recipe</a>' + '<a href="#" class="randomRecpiesList__href">Save</a>');
    i++;
}

function showMeals() {
    addList();
    meals.forEach(testt);
}

showMeals();