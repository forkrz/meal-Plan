import { Api } from "./Api.js";
import { Modals } from "./Modals.js";
import { Pagination } from "./Pagination.js";
export class Table {
    constructor() {
        this.Api = new Api;
        this.Modals = new Modals;
        this.Pag = new Pagination;
    }

    mealPlansData = async(minScope, maxScope) => {
        const records = await this.Api.getPaginatedRecords(minScope, maxScope);
        const recordsJson = await records.json();
        return recordsJson['meals'];
    }

    TotalNoOfRecordsForUser = async(minScope, maxScope) => {
        const records = await this.Api.getPaginatedRecords(minScope, maxScope);
        const recordsJson = await records.json();
        return recordsJson['TotalPlansForUser'];
    }

    createTrElement = (records, n) => {
        const tbody = document.getElementById('tbody');
        tbody.insertAdjacentHTML('beforeEnd', '<tr id="tr' + n + '"></tr>');
        this.createTdElements(records, n);
        this.showMealsAddEvenListeners(n);
    }

    createTdElements = (records, n) => {
        const tr = document.getElementById('tr' + n);
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PLAN_ID + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CALORIES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PROTEINS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].FATS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CARBOHYDRATES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td><button class="showMealsButton"id="showMeals' + n + '">SHOW MEALS</button></td>');
        const button = document.getElementById(`showMeals${n}`);
        button.dataset.indexNumber = n;
    }

    showMealsAddEvenListeners = (n) => {
        const button = document.querySelector(`[data-index-number="${n}"]`);
        button.addEventListener('click', () => {
            console.log(n);
        });
    }

    insertMealsPlansDataIntoTable = async(minScope, maxScope) => {
        const records = await this.mealPlansData(minScope, maxScope);
        const tbody = document.getElementById('tbody');
        const maxRecords = await this.TotalNoOfRecordsForUser(0, 10);
        tbody.innerHTML = "";
        this.Pag.firstNotesAndpreviousButtonsController(minScope);
        this.Pag.lastNotesAndNextButtonsController(maxScope, maxRecords);
        records.forEach((data, n) => this.createTrElement(records, n));
    }

}