import { Modals } from './classes/Modals.js';
import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';
import { Table } from './classes/Table.js';
import { RandomTable } from './classes/RandomMealTable.js';

const addMealPlanButton = document.getElementById('addMealPlanIcon');
const addMealPlanModal = document.getElementById('modal');
const generateRandomMealIcon = document.getElementById('generateRandomMealIcon');

const mealPlansTab = document.getElementById('mealPlansTab');
const randomMealsTab = document.getElementById('randomMealsTab');


const modal = new Modals();
const table = new Table();
const randomTable = new RandomTable();

let minNotes = 0;
let maxNotes = 10;

table.insertMealsPlansDataIntoTable(minNotes, maxNotes);


addMealPlanButton.addEventListener('click', () => {
    modal.GenerateMealPlanmodalHandler(addMealPlanModal, addMealPlanModal);
});

mealPlansTab.addEventListener('click', () => {
    let minNotes = 0;
    let maxNotes = 10;
    table.modifyHeadersOfTheTable();
    table.insertMealsPlansDataIntoTable(minNotes, maxNotes);
});

randomMealsTab.addEventListener('click', () => {
    let minNotes = 0;
    let maxNotes = 10;
    randomTable.modifyHeadersOfTheTable();
    randomTable.insertRandomMealsDataIntoTable(minNotes, maxNotes);
});

generateRandomMealIcon.addEventListener('click', () => {
    modal.getRandomRecipeModalHandler(addMealPlanModal, addMealPlanModal);
});