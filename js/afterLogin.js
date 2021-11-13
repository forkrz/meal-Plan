import { Modals } from './classes/Modals.js';
import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';
const addMealPlanButton = document.getElementById('addMealPlanIcon');
const addMealPlanModal = document.getElementById('modal');
const closeButton = document.getElementById('closeButton');
const generateMealPlanbutton = document.getElementById('generateMealPlanbutton');
const dietType = document.getElementById('typeOfDietSelect');
const planLength = document.getElementById('planLength');
const calories = document.getElementById('calories');
const modal = new Modals();
const valid = new Validator();
const api = new Api();
addMealPlanButton.addEventListener('click', () => {
    modal.displayModal(addMealPlanModal);
});

closeButton.addEventListener('click', () => {
    modal.hideModal(addMealPlanModal);
});

generateMealPlanbutton.addEventListener('click', () => {
    api.generateMealPlanHander(dietType.options[dietType.selectedIndex].text, planLength.options[planLength.selectedIndex].text, calories.value);
});