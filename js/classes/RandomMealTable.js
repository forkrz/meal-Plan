import { Api } from "./Api.js";
import { Modals } from "./Modals.js";
import { Pagination } from "./Pagination.js";
import { HtmlElements } from "./HtmlElements.js";
export class RandomTable {
    constructor() {
        this.Api = new Api;
        this.Modals = new Modals;
        this.Pag = new Pagination;
        this.htmlElements = new HtmlElements;
    }

    randomMealsData = async(minScope, maxScope) => {
        const records = await this.Api.getRandomMealsAsPaginatedRecords(minScope, maxScope);
        const recordsJson = await records.json();
        return recordsJson['meals'];
    }

    totalNoOfRecordsForUser = async(minScope, maxScope) => {
        const records = await this.Api.getRandomMealsAsPaginatedRecords(minScope, maxScope);
        const recordsJson = await records.json();
        return recordsJson['TotalPlansForUser'];
    }

    modifyHeadersOfTheTable = () => {
        const table = document.getElementById('table');
        table.innerHTML = `<thead>
        <tr class="userInterface__tableContent__table__headings">
            <th>MEAL ID</th>
            <th>NAME</th>
            <th>PREP_TIME</th>
            <th>SERVINGS</th>
            <th>DETAILED INFO</th>
        </tr>
    </thead>
    <tbody id="tbody">
    </tbody>`;
    }

    createTrElement = (records, n) => {
        const tbody = document.getElementById('tbody');
        tbody.insertAdjacentHTML('beforeEnd', '<tr id="tr' + n + '"></tr>');
        this.createTdElements(records, n);
        this.showMealsAddEvenListeners(n);
    }
    createTdElements = (records, n) => {
        const tr = document.getElementById('tr' + n);
        tr.insertAdjacentHTML('beforeend', `<td id="planId${n}">` + records[n].RANDOM_MEAL_ID + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].NAME + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PREP_TIME + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].SERVINGS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td><button class="showMealsButton"id="showMeals' + n + '">SHOW MEALS</button></td>');
        const button = document.getElementById(`showMeals${n}`);
        button.dataset.indexNumber = n;
    }

    showMealsAddEvenListeners = (n) => {
        const modal = document.getElementById('modal');
        const planId = document.getElementById(`planId${n}`)
        const button = document.querySelector(`[data-index-number="${n}"]`);
        button.addEventListener('click', () => {
            this.htmlElements.showRandomRecipeDetailInfo(n);
        });
    }

    insertRandomMealsDataIntoTable = async(minScope, maxScope) => {
        const records = await this.randomMealsData(minScope, maxScope);
        const tbody = document.getElementById('tbody');
        const maxRecords = await this.totalNoOfRecordsForUser(0, 10);
        tbody.innerHTML = "";
        this.Pag.firstNotesAndpreviousButtonsController(minScope);
        this.Pag.lastNotesAndNextButtonsController(maxScope, maxRecords);
        records.forEach((data, n) => this.createTrElement(records, n));

        const replaceNavButtons = (buttonId, clickHandler) => {
            const buttonNode = document.getElementById(buttonId);
            const parentNode = buttonNode.parentElement;
            buttonNode.remove();
            const newButtonNode = buttonNode.cloneNode(true);
            newButtonNode.addEventListener('click', clickHandler);
            parentNode.appendChild(newButtonNode);
        }
        const buttonsIdsArray = ['firstRecordsButton', 'previousRecordsButton', 'nextRecordsButton', 'lastRecordsButton'];
        const buttonsHandlersArray = [
            () => {
                minScope = 0;
                maxScope = 10;
                this.insertRandomMealsDataIntoTable(minScope, maxScope);
            },
            () => {
                minScope -= 10;
                maxScope -= 10;
                this.insertRandomMealsDataIntoTable(minScope, maxScope);
            },
            () => {
                minScope += 10;
                maxScope += 10;
                this.insertRandomMealsDataIntoTable(minScope, maxScope);
            },
            async() => {
                const noteCount = await this.totalNoOfRecordsForUser(0, 10);
                const minCount = noteCount - noteCount % 10;
                minScope = minCount;
                maxScope = minCount + 10;
                this.insertRandomMealsDataIntoTable(minScope, maxScope);
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
        //     this.insertRandomMealsDataIntoTable(minScope, maxScope);
        // });

        // getPreviousNotes.addEventListener('click', () => {
        //     minScope -= 10;
        //     maxScope -= 10;
        //     this.insertRandomMealsDataIntoTable(minScope, maxScope);
        // });

        // getNextRecords.addEventListener('click', () => {
        //     console.log('RandomTable event');
        //     minScope += 10;
        //     maxScope += 10;
        //     this.insertRandomMealsDataIntoTable(minScope, maxScope);
        // });

        // getLastRecords.addEventListener('click', async() => {
        //     const noteCount = await this.totalNoOfRecordsForUser(0, 10);
        //     const minCount = noteCount - noteCount % 10;
        //     minScope = minCount;
        //     maxScope = minCount + 10;
        //     this.insertRandomMealsDataIntoTable(minScope, maxScope);
        // });

    }
}