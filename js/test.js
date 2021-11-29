import test from '../temporary/test.js';
const meals = test.recipes;
let i = 0;
const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('modal');



function getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute) {
    const extendedIngredients = meals[i].extendedIngredients;
    const result = extendedIngredients.map(ingredient => ingredient[atribute]);
    return result;
};

function addList() {
    modalContent.insertAdjacentHTML('beforeend',
        `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
}

function showAdditionalDataForOneRecipe() {

}


function testt() {
    const list = document.getElementById('randomRecpiesList');
    if (meals[i].title.length >= 10) {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + '<span class="randomRecpiesList__element__span">' +
            meals[i].title.substring(0, 12) + '...' + "</span>" +
            '<button class="randomRecpiesList__element__button">Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="showMeal">Save</button>' + '</li>');
    } else {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + meals[i] + '</li>' +
            '<a href="#" class="randomRecpiesList__href">Show recipe</a>' + '<a href="#" class="randomRecpiesList__href">Save</a>');
    }

    i++;
}




function showMeals() {
    addList();
    meals.forEach(testt);
    modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies">autorenew</span>`)
}