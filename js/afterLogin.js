import { Modals } from './classes/Modals.js';
import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';
const addMealPlanButton = document.getElementById('addMealPlanIcon');
const addMealPlanModal = document.getElementById('modal');
const generateRandomMealIcon = document.getElementById('generateRandomMealIcon');
const modal = new Modals();
const valid = new Validator();
const api = new Api();
addMealPlanButton.addEventListener('click', () => {
    modal.GenerateMealPlanmodalHandler(addMealPlanModal, addMealPlanModal);
});

generateRandomMealIcon.addEventListener('click', () => {
    modal.getRandomRecipeModalHandler(addMealPlanModal, addMealPlanModal);
});