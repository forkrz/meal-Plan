import { Api } from "./Api.js";
export class Table {
    constructor() {
        this.Api = new Api;
    }

    mealPlansData = async(minScope, maxScope) => {
        const records = await this.Api.getPaginatedRecords(minScope, maxScope);
        const recordsJson = await records.json();
        return recordsJson['meals'];
    }

    createTrElement = (records, n) => {
        const tbody = document.getElementById('tbody');
        tbody.insertAdjacentHTML('beforeEnd', '<tr id="tr' + n + '"></tr>');
        this.createTdElements(records, n);
    }

    createTdElements = (records, n) => {
        const tr = document.getElementById('tr' + n);
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PLAN_ID + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CALORIES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].PROTEINS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].FATS + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td>' + records[n].CARBOHYDRATES + '</td>');
        tr.insertAdjacentHTML('beforeend', '<td><a href="#"> show meals</a></td>');
    }
    insertMealsPlansDataIntoTable = async(minScope, maxScope) => {
        const records = await this.mealPlansData(minScope, maxScope);
        const tbody = document.getElementById('tbody');
        records.forEach((data, n) => this.createTrElement(records, n));

    }

}