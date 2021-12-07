import { Api } from './Api.js';
import { Validator } from './Validator.js';
import test from '../../temporary/test.js';

export class Modals {
    constructor() {
        this.api = new Api;
        this.Validator = new Validator;
    }
    displayModal = (modalName) => {
        modalName.classList.remove('hide');
    }

    hideModal = (modalName) => {
        modalName.classList.add('hide');
    }
    clearModalContent() {
        const modal = document.getElementById('modalContent');
        modal.innerHTML = "";
    }
    showGenerateMealPlansModal = (modalContainer, modalName) => {
        modalContainer.innerHTML = `<div class="modal__content">
        <header class="modal__header">
            <button class="material-icons modal__header__button" id="closeButton">close</button>
            <span class="modal__content__span">Preferences:</span>
        </header>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Choose a type of Diet:</label>
        <select name="typesOfDiets" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Primal">Primal</option>
            <option value="Low-FODMAP">Low-FODMAP</option>
            <option value="Whole30">Whole30</option>
        </select>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Plan for day/week:</label>
        <select name="mealPlanPeriod" class="modal__content__typesOfDiet__select" id="planLength">
            <option value="day">Day</option>
            <option value="week">Week</option>
        </select>
        <label for="calories" class="modal__content__typesOfDiet">Calories:</label>
        <input type="number" oninput="validity.valid||(value='');" name="calories" class="modal__content__typesOfDiet__input" id="calories">
        <span class="form_errorInfoModal hide" id="CaloriesErrorInfo">This field cannont be empty or equal to 0</span>
        <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
    </div>`
        this.displayModal(modalName);
    }
    showGetRandomRecipeModal = (modalContainer) => {
        modalContainer.innerHTML = `<div class="modal__content" id="modalContent">
        <header class="modal__header">
            <button class="material-icons modal__header__button" id="closeButton">close</button>
            <span class="modal__content__span" id="modalContentSpan">Preferences:</span>
        </header>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Choose a type of Diet:</label>
        <select name="typesOfDiets" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Primal">Primal</option>
            <option value="Low FODMAP">Low FODMAP</option>
            <option value="Whole30">Whole30</option>
        </select>
        <label for="typesOfCuisines" class="modal__content__typesOfDiet">Choose a type of cuisine:</label>
        <select name="typesOfCuisines" class="modal__content__typesOfDiet__select" id="typesOfCuisines">
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern-European</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Mexican">Mexican</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
        </select>
        <label for="typesOfMeals" class="modal__content__typesOfDiet">Choose a type of meal:</label>
        <select name="typesOfMeals" class="modal__content__typesOfDiet__select" id="typesOfMeals">
            <option value="breakfast">breakfast</option>
            <option value="soup">soup</option>
            <option value="main-course">main-course</option>
            <option value="salad">salad</option>
            <option value="fingerfood">fingerfood</option>
            <option value="snack">snack</option>
            <option value="fingerfood">fingerfood</option>
            <option value="drink">drink</option>
            <option value="beverage">beverage</option>
            <option value="bread">bread</option>
        </select>
        <div class = "modal__content_buttonIconContainer" id="buttonIconContainer">
            <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
        </div>
        <span class="form_errorInfoModal hide" id="FinalError"></span>
    </div>`
        this.displayModal(modalContainer);
    }

    getRandomRecipeIfSuccessReplaceHTMLElemnts = () => {
        const container = document.getElementById('buttonIconContainer')
        const icon = document.createElement('button');
        icon.innerHTML = '<span class="material-icons nextModalPage" id="nextModalPage">east</span>';
        const button = container.firstChild;
        container.replaceChildren(icon, button);
    }

    getRandomRecipeModalHandler = (modalContainer, modalName) => {
        this.showGetRandomRecipeModal(modalContainer, modalName);
        const modalContent = document.getElementById('modalContent');
        const closeButton = document.getElementById('closeButton');
        const getRandomRecipeButton = document.getElementById('generateMealPlanbutton');
        const dietType = document.getElementById('typeOfDietSelect');
        const cuisineType = document.getElementById('typesOfCuisines');
        const mealsType = document.getElementById('typesOfMeals');
        const errorBox = document.getElementById('FinalError');
        const modalContentSpan = document.getElementById('modalContentSpan');
        modalContent.style.minWidth = 0;
        modalContent.style.maxWidth = "33%";
        modalContentSpan.style.marginLeft = "3rem";
        getRandomRecipeButton.addEventListener('click', () => {
            if (this.Validator.getRandomRecipeHandler(dietType.value, cuisineType.value, mealsType.value, errorBox)) {
                this.getRandomRecipeIfSuccessReplaceHTMLElemnts();
                const nextModalPage = document.getElementById('nextModalPage');
                nextModalPage.addEventListener('click', () => {
                    this.showGeneratedRandomMeals(modalContent);
                })
            }
        })

        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal(modalContainer);
        });
    }

    GenerateMealPlanmodalHandler = (modalContainer, modalName) => {
        this.showGenerateMealPlansModal(modalContainer, modalName);

        const generateMealPlanbutton = document.getElementById('generateMealPlanbutton');
        const closeButton = document.getElementById('closeButton');
        const dietType = document.getElementById('typeOfDietSelect');
        const planLength = document.getElementById('planLength');
        const calories = document.getElementById('calories');
        const caloriesErrorBox = document.getElementById('CaloriesErrorInfo');
        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal(modalContainer);
        });

        calories.addEventListener('keyup', () => {
            this.Validator.caloriesInputVisualValidation(calories.value, caloriesErrorBox);
        });

        generateMealPlanbutton.addEventListener('click', () => {
            this.Validator.generateMealPlanStatusHander(dietType.value, planLength.value, calories.value, caloriesErrorBox);
        });
    }

    getPrepInstructionForOneRecipe = (numberOfRecipe) => {
        const meals = test.recipes;
        const instruction = meals[numberOfRecipe].instructions.replace(/<\/?[^>]+>/gi, '')
        return instruction;
    }

    getSpecifiedIngredientsDataForOneRecipe = (numberOfRecipe, atribute) => {
        const meals = test.recipes;
        const extendedIngredients = meals[numberOfRecipe].extendedIngredients;
        const result = extendedIngredients.map(ingredient => ingredient[atribute]);
        return result;
    };

    showPrepInstructionForOneMeal = (numberOfRecipe) => {
        const meals = test.recipes;
        modalContent.insertAdjacentHTML('beforeend', '<span class="listOfIngridents__header">Instruction:</span>' + '<span class="recipeConatiner">' + this.getPrepInstructionForOneRecipe(numberOfRecipe) + '</span>')
    }

    showPrepTimeAndQtyOfServings = (numberOfRecipe) => {
        const meals = test.recipes;
        modalContent.insertAdjacentHTML('beforeend', '<div class="PrepTimeServings"><span class="PrepTimeServings__span">Time to prepare: ' + meals[numberOfRecipe].readyInMinutes + 'min' + '</span><span class="PrepTimeServings__span">Servings:' + meals[numberOfRecipe].servings + '</span></div>')
    }



    showReicpeDetailInfo = (atribute, numberOfRecipe) => {
        const modalContent = document.getElementById('modalContent');
        let i = 0;
        modalContent.style.minWidth = 10;
        modalContent.insertAdjacentHTML('beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>' + '<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">Ingridients:</span></ul>');
        const list = document.getElementById('listOfIngridents');
        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute);
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
        this.showPrepTimeAndQtyOfServings(numberOfRecipe);
        this.showPrepInstructionForOneMeal(numberOfRecipe);
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showGeneratedRandomMeals(modalContent);
        })
    }

    addList = () => {
        modalContent.insertAdjacentHTML('beforeend',
            `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
    }

    showTitleOfRandomRecipe = (element, n) => {
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

    showGeneratedRandomMeals = (modalContent) => {
        const meals = test.recipes;
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.addList();
        meals.forEach((el, n) => this.showTitleOfRandomRecipe(el, n));
        modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies" id ="autorenew">autorenew</span>`)

        const showRecipe0 = document.getElementById('showRecipe0');
        const showRecipe1 = document.getElementById('showRecipe1');
        const showRecipe2 = document.getElementById('showRecipe2');

        showRecipe0.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 0);
        });
        showRecipe1.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 1);
        });
        showRecipe2.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 2);
        });
    }

}