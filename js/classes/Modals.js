import { Api } from './Api.js';
import { Validator } from './Validator.js';

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
    showGetRandomRecipeModal = (modalContainer, modalName) => {
        modalContainer.innerHTML = `<div class="modal__content">
        <header class="modal__header">
            <button class="material-icons modal__header__button" id="closeButton">close</button>
            <span class="modal__content__span">Preferences:</span>
        </header>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Choose a type of Diet:</label>
        <select name="typesOfDiets" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="Gluten Free">Gluten Free</option>
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
        <select name="typesOfCuisines" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
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
        <select name="typesOfMeals" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="breakfast">breakfast</option>
            <option value="soup">soup</option>
            <option value="main course">main course</option>
            <option value="salad">salad</option>
            <option value="fingerfood">fingerfood</option>
            <option value="snack">snack</option>
            <option value="fingerfood">fingerfood</option>
            <option value="drink">drink</option>
            <option value="beverage">beverage</option>
            <option value="bread">bread</option>
        </select>
        <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
    </div>`
        this.displayModal(modalName);
    }

    getRandomRecipeModalHandler = (modalContainer, modalName) => {
        this.showGetRandomRecipeModal(modalContainer, modalName);
        const closeButton = document.getElementById('closeButton');
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
}