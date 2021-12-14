import { Modals } from './classes/Modals.js';
import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';
import { Table } from './classes/Table.js';
const addMealPlanButton = document.getElementById('addMealPlanIcon');
const addMealPlanModal = document.getElementById('modal');
const generateRandomMealIcon = document.getElementById('generateRandomMealIcon');
const modal = new Modals();
const valid = new Validator();
const api = new Api();
const table = new Table();

const xd = table.mealPlansData(0, 10);
console.log(await xd);

table.insertMealsPlansDataIntoTable(0, 10);
addMealPlanButton.addEventListener('click', () => {
    modal.GenerateMealPlanmodalHandler(addMealPlanModal, addMealPlanModal);
});

generateRandomMealIcon.addEventListener('click', () => {
    modal.getRandomRecipeModalHandler(addMealPlanModal, addMealPlanModal);
});