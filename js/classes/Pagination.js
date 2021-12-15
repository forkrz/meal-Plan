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

    LastNotesAndNextButtonsController(maxScope, maxRecords) {
        const lastRecordsButton = document.getElementById('lastRecordsButton');
        const lastRecordsIcon = document.getElementById('lastRecordsIcon');
        const nextRecordsButton = document.getElementById('nextRecordsButton');
        const nextRecordsIcon = document.getElementById('nextRecordsIcon');
        if (maxScope >= maxRecords)
    }

}