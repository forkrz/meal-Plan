import { Modals } from './classes/Modals.js';
import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';
import { Table } from './classes/Table.js';
const addMealPlanButton = document.getElementById('addMealPlanIcon');
const addMealPlanModal = document.getElementById('modal');
const generateRandomMealIcon = document.getElementById('generateRandomMealIcon');

const getFirstNotes = document.getElementById('firstRecordsButton');
const getPreviousNotes = document.getElementById('previousRecordsButton');
const getNextRecords = document.getElementById('nextRecordsButton');
const getLastRecords = document.getElementById('lastRecordsButton');

const modal = new Modals();
const valid = new Validator();
const api = new Api();
const table = new Table();
let minNotes = 0;
let maxNotes = 10;

table.insertMealsPlansDataIntoTable(minNotes, maxNotes);

getFirstNotes.addEventListener('click', () => {
    minNotes = 0;
    maxNotes = 10;
    table.insertMealsPlansDataIntoTable(minNotes, maxNotes);
});

getPreviousNotes.addEventListener('click', () => {
    minNotes -= 10;
    maxNotes -= 10;
    table.insertMealsPlansDataIntoTable(minNotes, maxNotes);
});

getNextRecords.addEventListener('click', () => {
    minNotes += 10;
    maxNotes += 10;
    table.insertMealsPlansDataIntoTable(minNotes, maxNotes);
});

getLastRecords.addEventListener('click', async() => {
    const noteCount = await table.TotalNoOfRecordsForUser(0, 10);
    const minCount = noteCount - noteCount % 10;
    minNotes = minCount;
    maxNotes = minCount;
    table.insertMealsPlansDataIntoTable(minNotes, maxNotes);
});

addMealPlanButton.addEventListener('click', () => {
    modal.GenerateMealPlanmodalHandler(addMealPlanModal, addMealPlanModal);
});

generateRandomMealIcon.addEventListener('click', () => {
    modal.getRandomRecipeModalHandler(addMealPlanModal, addMealPlanModal);
});