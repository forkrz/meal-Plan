export class Pagination {

    firstNotesAndpreviousButtonsController(minScope) {
        const firstRecordsButton = document.getElementById('firstRecordsButton');
        const firstRecordsIcon = document.getElementById('firstRecordsIcon');
        const previousRecordButton = document.getElementById('previousRecordsButton');
        const previousRecordIcon = document.getElementById('previousRecordsIcon');
        if (minScope == 0) {
            firstRecordsButton.disabled = true;
            previousRecordButton.disabled = true;
            previousRecordIcon.disabled = true;
            firstRecordsIcon.disabled = true;
            firstRecordsButton.classList.add('blocked');
            previousRecordButton.classList.add('blocked');
            previousRecordIcon.classList.add('blocked');
            firstRecordsIcon.classList.add('blocked');
            return 'block';
        } else {
            firstRecordsButton.disabled = false;
            previousRecordButton.disabled = false;
            previousRecordIcon.disabled = false;
            firstRecordsIcon.disabled = false;
            firstRecordsButton.classList.remove('blocked');
            previousRecordButton.classList.remove('blocked');
            previousRecordIcon.classList.remove('blocked');
            firstRecordsIcon.classList.remove('blocked');
            return 'nieblock';
        }
    }

    lastNotesAndNextButtonsController(maxScope, maxRecords) {
        const maxScopeFinal = maxScope + maxRecords % 10;
        const lastRecordsButton = document.getElementById('lastRecordsButton');
        const lastRecordsIcon = document.getElementById('lastRecordsIcon');
        const nextRecordsButton = document.getElementById('nextRecordsButton');
        const nextRecordsIcon = document.getElementById('nexRecordsIcon');
        if (maxScopeFinal > maxRecords) {
            lastRecordsButton.disabled = true;
            nextRecordsButton.disabled = true;
            nextRecordsIcon.disabled = true;
            lastRecordsIcon.disabled = true;
            lastRecordsButton.classList.add('blocked');
            nextRecordsButton.classList.add('blocked');
            nextRecordsIcon.classList.add('blocked');
            lastRecordsIcon.classList.add('blocked');
        } else {
            lastRecordsButton.disabled = false;
            nextRecordsButton.disabled = false;
            nextRecordsIcon.disabled = false;
            lastRecordsIcon.disabled = false;
            lastRecordsButton.classList.remove('blocked');
            nextRecordsButton.classList.remove('blocked');
            nextRecordsIcon.classList.remove('blocked');
            lastRecordsIcon.classList.remove('blocked');
        }
    }

}