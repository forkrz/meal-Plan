export class Api {
    constructor(login, password) {
        import { Validator } from './classes/Validator.js';
        this.login = login,
            this.password = password,
            this.Validator = new Validator;

    }

    async sendData() {
        await fetch('http://mp.localhost/php/login.php', {
            method: 'POST',
            body: JSON.stringify({
                LOGIN: login.value,
                PASSWORD: password.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        return response.JSON();
    }
}