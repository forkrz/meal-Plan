import { Cookies } from './Cookies.js';
export class Pagination {
    constructor() {
        this.Cookies = new Cookies;
    }
    getFirstNotes = async() => {
        const response = await (fetch('http://mp.localhost/php/api/pagination.php', {
            method: 'POST',
            body: JSON.stringify({
                min: 0,
                max: 10,
                JWT: this.Cookies.getCookie('jwt')
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }));
        return response;
    }
}