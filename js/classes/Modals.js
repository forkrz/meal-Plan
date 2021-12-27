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
        let i = 0;
        modalContent.style.minWidth = 10;

        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute, meals);
        this.showPrepTimeAndQtyOfServings(numberOfRecipe, meals);
        this.showPrepInstructionForOneMeal(numberOfRecipe, meals);
    }

    convertArrayOfIngridientsToString = (arrayWithIngredients) => {
        let ingr = [];
        arrayWithIngredients.forEach((ingirdient) => {
            ingr.push(ingirdient.originalString);
        })
        return String(ingr);
    }


    getNewRandomRecipes = async(modalContent) => {
        const preferences = localStorage.getItem('RandomMealsPreferences');
        const preferencesAsArray = JSON.parse(preferences);
        const res = await this.api.getRandomRecipe(preferencesAsArray[0].dietType, preferencesAsArray[1].cuisineType, preferencesAsArray[2].mealType);
        const resJSON = await res.json();
        document.getElementById('randomRecpiesList').innerHTML = "";
        this.htmlElements.closeIconAddEvenListener(modalContent);
        localStorage.setItem('randomRecipes', JSON.stringify(resJSON['mealsData']));
        this.htmlElements.createListElements(this.htmlElements.getDataForRandomMealsFromLocalStorage('randomRecipes'));
        const saveRecipe0 = document.getElementById('saveRecipe0');
        const saveRecipe1 = document.getElementById('saveRecipe1');
        const saveRecipe2 = document.getElementById('saveRecipe2');
        const meals = this.htmlElements.getDataForRandomMealsFromLocalStorage('randomRecipes');
        const errorBox = document.getElementById('FinalError');
        saveRecipe0.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[0].title, meals[0].readyInMinutes, meals[0].servings, this.convertArrayOfIngridientsToString(meals[0].extendedIngredients), meals[0].instructions, errorBox, 0);
        })

        saveRecipe1.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[1].title, meals[1].readyInMinutes, meals[1].servings, this.convertArrayOfIngridientsToString(meals[1].extendedIngredients), meals[1].instructions, errorBox, 1);
        })

        saveRecipe2.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[2].title, meals[2].readyInMinutes, meals[2].servings, this.convertArrayOfIngridientsToString(meals[2].extendedIngredients), meals[2].instructions, errorBox, 2);
        })
    }


    showGeneratedRandomMeals = (modalContent) => {
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.htmlElements.createListWithRecipesToTable(modalContent);
        this.htmlElements.closeIconAddEvenListener(modalContent);
        this.htmlElements.createListElements(this.htmlElements.getDataForRandomMealsFromLocalStorage('randomRecipes'));
        this.htmlElements.createNewRandomRecipesIcon(modalContent);
        const refreshButton = document.getElementById('autorenew');
        refreshButton.addEventListener('click', () => {
            this.getNewRandomRecipes(modalContent);
        });

        const saveRecipe0 = document.getElementById('saveRecipe0');
        const saveRecipe1 = document.getElementById('saveRecipe1');
        const saveRecipe2 = document.getElementById('saveRecipe2');
        const meals = this.htmlElements.getDataForRandomMealsFromLocalStorage('randomRecipes');
        const errorBox = document.getElementById('FinalError');
        saveRecipe0.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[0].title, meals[0].readyInMinutes, meals[0].servings, this.convertArrayOfIngridientsToString(meals[0].extendedIngredients), meals[0].instructions, errorBox, 0);
        })

        saveRecipe1.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[1].title, meals[1].readyInMinutes, meals[1].servings, this.convertArrayOfIngridientsToString(meals[1].extendedIngredients), meals[1].instructions, errorBox, 1);
        })

        saveRecipe2.addEventListener('click', () => {
            this.validator.saveRandomRecipeHandler(meals[2].title, meals[2].readyInMinutes, meals[2].servings, this.convertArrayOfIngridientsToString(meals[2].extendedIngredients), meals[2].instructions, errorBox, 2);
        })

    }

    showMealsFromMealPlan = async(planId) => {
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
    }

}