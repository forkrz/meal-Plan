import { Api } from "./Api.js";
import { Modals } from "./Modals.js";
import { Pagination } from "./Pagination.js";
import { HtmlElements } from "./HtmlElements.js";
export class Table {
    constructor() {
        this.Api = new Api;
        this.Modals = new Modals;
        this.Pag = new Pagination;
        this.HtmlElements = new HtmlElements;
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

    modifyHeadersOfTheTable = () => {
        const table = document.getElementById('table');
        table.innerHTML = `<thead>
        <tr class="userInterface__tableContent__table__headings">
            <th>PLAN_ID</th>
            <th>CALORIES</th>
            <th>PROTEINS</th>
            <th>FATS</th>
            <th>CARBOHYDRATES</th>
            <th>SHOW MEALS</th>
        </tr>
    </thead>
    <tbody id="tbody">
    </tbody>`

    }
    createTrElement = (records, n) => {
        const tbody = document.getElementById('tbody');
        tbody.insertAdjacentHTML('beforeEnd', '<tr id="tr' + n + '"></tr>');
        this.createTdElements(records, n);
        this.showMealsAddEvenListeners(n);
    }

    createTdElements = (records, n) => {
        const tr = document.getElementById('tr' + n);
        tr.insertAdjacentHTML('beforeend', `<td id="planId${n}">` + records[n].PLAN_ID + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CALORIES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PROTEINS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].FATS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CARBOHYDRATES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td><button class="showMealsButton"id="showMeals' + n + '">SHOW MEALS</button></td>');
        const button = document.getElementById(`showMeals${n}`);
        button.dataset.indexNumber = n;
    }

    showMealsAddEvenListeners = (n) => {
        const modal = document.getElementById('modal');
        const planId = document.getElementById(`planId${n}`)
        const button = document.querySelector(`[data-index-number="${n}"]`);
        button.addEventListener('click', () => {
            this.HtmlElements.showMealsFromMealPlan(n);
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

        const replaceNavButtons = (buttonId, clickHandler) => {
            const buttonNode = document.getElementById(buttonId);
            const parentNode = buttonNode.parentElement;
            const newButtonNode = buttonNode.cloneNode(true);
            buttonNode.remove();
            newButtonNode.addEventListener('click', clickHandler);
            parentNode.appendChild(newButtonNode);
        }
        const buttonsIdsArray = ['firstRecordsButton', 'previousRecordsButton', 'nextRecordsButton', 'lastRecordsButton'];
        const buttonsHandlersArray = [
            () => {
                minScope = 0;
                maxScope = 10;
                this.insertMealsPlansDataIntoTable(minScope, maxScope);
            },
            () => {
                minScope -= 10;
                maxScope -= 10;
                this.insertMealsPlansDataIntoTable(minScope, maxScope);
            },
            () => {
                minScope += 10;
                maxScope += 10;
                this.insertMealsPlansDataIntoTable(minScope, maxScope);
            },
            async() => {
                const noteCount = await this.TotalNoOfRecordsForUser(0, 10);
                const minCount = noteCount - noteCount % 10;
                minScope = minCount;
                maxScope = minCount + 10;
                this.insertMealsPlansDataIntoTable(minScope, maxScope);
            }
        ]
        buttonsIdsArray.forEach((id, i) => {
            replaceNavButtons(id, buttonsHandlersArray[i])
        })

        // const getFirstNotes = document.getElementById('firstRecordsButton');
        // const getPreviousNotes = document.getElementById('previousRecordsButton');
        // const getNextRecords = document.getElementById('nextRecordsButton');
        // const getLastRecords = document.getElementById('lastRecordsButton');



        // getFirstNotes.addEventListener('click', () => {
        //     minScope = 0;
        //     maxScope = 10;
        //     this.insertMealsPlansDataIntoTable(minScope, maxScope);
        // });

        // getPreviousNotes.addEventListener('click', () => {
        //     minScope -= 10;
        //     maxScope -= 10;
        //     this.insertMealsPlansDataIntoTable(minScope, maxScope);
        // });

        // getNextRecords.addEventListener('click', () => {
        //     console.log('Table event');
        //     minScope += 10;
        //     maxScope += 10;
        //     this.insertMealsPlansDataIntoTable(minScope, maxScope);
        // });

        // getLastRecords.addEventListener('click', async() => {
        //     const noteCount = await this.TotalNoOfRecordsForUser(0, 10);
        //     const minCount = noteCount - noteCount % 10;
        //     minScope = minCount;
        //     maxScope = minCount + 10;
        //     this.insertMealsPlansDataIntoTable(minScope, maxScope);
        // });
    }

}