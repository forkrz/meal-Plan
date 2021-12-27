import test from '../temporary/test.js';
const meals = test.recipes;
let i = 0;
const modalContent = document.getElementById('modalContent');
const modal = document.getElementById('modal');

function getPrepInstructionForOneRecipe(numberOfRecipe) {
    const instruction = meals[numberOfRecipe].instructions.replace(/<\/?[^>]+>/gi, '')
    return instruction;
}

function getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute) {
    const extendedIngredients = meals[numberOfRecipe].extendedIngredients;
    const result = extendedIngredients.map(ingredient => ingredient[atribute]);
    return result;
};

function showPrepInstructionForOneMeal(numberOfRecipe) {
    modalContent.insertAdjacentHTML('beforeend', '<span class="listOfIngridents__header">Instruction:</span>' + '<span class="recipeConatiner">' + getPrepInstructionForOneRecipe(numberOfRecipe) + '</span>')
}

function showPrepTimeAndQtyOfServings(numberOfRecipe) {
    modalContent.insertAdjacentHTML('beforeend', '<div class="PrepTimeServings"><span class="PrepTimeServings__span">Time to prepare: ' + meals[numberOfRecipe].readyInMinutes + 'min' + '</span><span class="PrepTimeServings__span">Servings:' + meals[numberOfRecipe].servings + '</span></div>')
}



function showReicpeDetailInfo(atribute, numberOfRecipe) {
    let i = 0;
    modalContent.style.minWidth = 0;
    modalContent.style.maxWidth = 35 + "%";
    modalContent.insertAdjacentHTML('beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>' + '<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">Ingridients:</span></ul>');
    const list = document.getElementById('listOfIngridents');
    const ingirdientsData = getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute);
    ingirdientsData.forEach(ingredient => {
        const listelement = list.appendChild(document.createElement('li'));
        if (ingirdientsData.length - 1 === i) {
            listelement.insertAdjacentHTML('beforeend', ingirdientsData[i]);
            listelement.className = "listOfIngridents__li";
            i++;
        } else {
            listelement.insertAdjacentHTML('beforeend', ingirdientsData[i] + ',');
            listelement.className = "listOfIngridents__li";
            i++;
        }
    });
    showPrepTimeAndQtyOfServings(numberOfRecipe);
    showPrepInstructionForOneMeal(numberOfRecipe);
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        modalContent.innerHTML = "";
        showMeals();
    })
}

function addList() {
    modalContent.insertAdjacentHTML('beforeend',
        `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
}

function testt(element, n) {
    const list = document.getElementById('randomRecpiesList');

    if (element.title.length >= 10) {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + '<span class="randomRecpiesList__element__span">' +
            element.title.substring(0, 12) + '...' + "</span>" +
            '<button class="randomRecpiesList__element__button" id="showRecipe' + n + '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' + '</li>');
    } else {
        list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + element.title +
            '<button class="randomRecpiesList__element__button" id="showRecipe' + n + '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' + '</li>');
    }
}

async function saveRecipe(title, prepTime, servings, ingredients, instruction) {
    const response = await (fetch('http://mp.localhost/php/api/saveRandomRecipe.php', {
        method: 'POST',
        body: JSON.stringify({
            name: title,
            prepTime: prepTime,
            servings: servings,
            ingredients: ingredients,
            instruction: instruction,
            JWT: this.Cookies.getCookie('jwt')
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }));
    return response;
}




function showMeals() {
    modalContent.style.minWidth = 35 + "%";
    modalContent.style.maxWidth = 0;
    addList();
    meals.forEach((el, n) => testt(el, n));
    modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies" id ="autorenew">autorenew</span>`)

    const showRecipe0 = document.getElementById('showRecipe0');
    const showRecipe1 = document.getElementById('showRecipe1');
    const showRecipe2 = document.getElementById('showRecipe2');

    showRecipe0.addEventListener('click', () => {
        modalContent.innerHTML = "";
        showReicpeDetailInfo('originalString', 0);
    });
    showRecipe1.addEventListener('click', () => {
        modalContent.innerHTML = "";
        showReicpeDetailInfo('originalString', 1);
    });
    showRecipe2.addEventListener('click', () => {
        modalContent.innerHTML = "";
        showReicpeDetailInfo('originalString', 2);
    });
}

showMeals();