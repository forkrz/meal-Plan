import { Api } from './Api.js';
import { Validator } from './validator.js';
import { HtmlElements } from './HtmlElements.js';

export class Modals {
    constructor() {
        this.api = new Api;
        this.validator = new Validator;
        this.htmlElements = new HtmlElements;
    }
    displayModal = (modalName) => {
        modalName.classList.remove('hide');
    }


    clearModalContent() {
        const modal = document.getElementById('modalContent');
        modal.innerHTML = "";
    }

    getRandomRecipeModalHandler = (modalContainer, modalName) => {
        this.htmlElements.createGetRandomRecipeModal(modalContainer, modalName);
        this.displayModal(modalContainer);
        this.htmlElements.closeIconAddEvenListener(modalContainer);
        const modalContent = document.getElementById('modalContent');
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
            if (this.validator.getRandomRecipeHandler(dietType.value, cuisineType.value, mealsType.value, errorBox)) {
                this.htmlElements.replaceGetMealsButtonWithLeftArrowIcon();
                const nextModalPage = document.getElementById('nextModalPage');
                nextModalPage.addEventListener('click', () => {
                    this.showGeneratedRandomMeals(modalContent);
                })
            }
        })
    }

    GenerateMealPlanmodalHandler = (modalContainer) => {
        this.htmlElements.createGenerateMealPlansModal(modalContainer);
        this.displayModal(modalContainer);
        const generateMealPlanbutton = document.getElementById('generateMealPlanbutton');
        const dietType = document.getElementById('typeOfDietSelect');
        const planLength = document.getElementById('planLength');
        const calories = document.getElementById('calories');
        const caloriesErrorBox = document.getElementById('CaloriesErrorInfo');

        generateMealPlanbutton.disabled = true;
        generateMealPlanbutton.classList.add("blocked");

        this.htmlElements.closeIconAddEvenListener(modalContainer);

        calories.addEventListener('keyup', () => {
            this.validator.caloriesInputVisualValidation(calories.value, caloriesErrorBox, generateMealPlanbutton);
        });

        generateMealPlanbutton.addEventListener('click', () => {
            this.validator.generateMealPlanStatusHander(dietType.value, planLength.value, calories.value, caloriesErrorBox, generateMealPlanbutton);
        });
    }

    showReicpeDetailInfo = (atribute, numberOfRecipe, meals) => {
        const modalContent = document.getElementById('modalContent');
        const modal = document.getElementById('modal');
        let i = 0;
        modalContent.style.minWidth = 10;

        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute, meals);
        this.showPrepTimeAndQtyOfServings(numberOfRecipe, meals);
        this.showPrepInstructionForOneMeal(numberOfRecipe, meals);
    }

    showGeneratedRandomMeals = (modalContent) => {
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.addList(modalContent);
        meals.forEach((el, n) => this.showTitleOfRandomRecipeAndLinks(el, n));
        modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies" id ="autorenew">autorenew</span>`)
    }

    showMealsFromMealPlan = async(planId) => {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
    }

}