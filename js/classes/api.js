import { Validator } from './Validator.js';

export class Api {
    constructor(login, password) {

        this.login = login,
            this.password = password,
            this.Validator = new Validator;

    }

    async sendData(e) {
        e.preventDefault();
        const response = await (fetch('http://mp.localhost/php/login.php', {
            method: 'POST',
            body: JSON.stringify({
                LOGIN: login.value,
                PASSWORD: password.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }));
        console.log(response);
        return response.json();
    }
}