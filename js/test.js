import test from '../temporary/test.js';
const meals = test.recipes;
let i = 0;
const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('modal');


meals.forEach(meal => {
    console.log(meal.extendedIngredients);
})



function addList() {
    modalContent.insertAdjacentHTML('beforeend',
        `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
}


function testt() {
    const list = document.getElementById('randomRecpiesList');
    if (meals[i].title.length >= 10) {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + '<span class="randomRecpiesList__element__span">' +
            meals[i].title.substring(0, 12) + '...' + "</span>" +
            '<a href="#" class="randomRecpiesList__href">Show recipe</a>' + '<a href="#" class="randomRecpiesList__href" id="showMeal">Save</a>' + '</li>');
    } else {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + meals[i] + '</li>' +
            '<a href="#" class="randomRecpiesList__href">Show recipe</a>' + '<a href="#" class="randomRecpiesList__href">Save</a>');
    }

    i++;
}
const igridients = meals[i].extendedIngredients;


function showMeals() {
    addList();
    meals.forEach(testt);
    modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies">autorenew</span>`)
}

showMeals();