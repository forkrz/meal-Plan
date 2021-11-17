import { Api } from './Api.js';

export class Modals {
    constructor() {
        this.api = new Api;
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
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Plan for day/week:</label>
        <select name="mealPlanPeriod" class="modal__content__typesOfDiet__select" id="planLength">
            <option value="day">Day</option>
            <option value="week">Week</option>
        </select>
        <label for="calories" class="modal__content__typesOfDiet">Calories:</label>
        <input type="number" oninput="validity.valid||(value='');" name="calories" class="modal__content__typesOfDiet__input" id="calories">
        <span class="form_errorInfo hide" id="CaloriesErrorInfo">This field cannont be empty or equal to 0</span>
        <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
    </div>`
        this.displayModal(modalName);
    }
    showGetRandomRecipeModal = (modalContainer, modalName) => {


        this.displayModal(modalName);
    }


    GenerateMealPlanmodalHandler = (modalContainer, modalName) => {
        this.showGenerateMealPlansModal(modalContainer, modalName);
        let closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal(modalContainer);
        });

    }
}