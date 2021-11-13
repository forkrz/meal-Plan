export class Modals {

    displayModal(Mname) {
        Mname.classList.remove('hide');
    }

    hideModal(Mname) {
        Mname.classList.add('hide');
    }
}