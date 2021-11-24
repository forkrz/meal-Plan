import { Cookies } from "./Cookies.js";
export class Api {
    constructor(login, password) {
        this.Cookies = new Cookies;
        this.login = login;
        this.password = password;
    }

    sendAuthData = async() => {
        const response = await (fetch('http://mp.localhost/php/api/login.php', {
            method: 'POST',
            body: JSON.stringify({
                LOGIN: login.value,
                PASSWORD: password.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }));
        return response;
    }

    loginHandler = async() => {
        const res = await this.sendAuthData();
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }

    generateMealPlan = async(diet, timeframe, calories) => {
        const response = await (fetch('http://mp.localhost/php/api/getMealPlan.php', {
            method: 'POST',
            body: JSON.stringify({
                DIET: diet,
                TIMEFRAME: timeframe,
                CALORIES: String(calories),
                JWT: this.Cookies.getCookie('jwt')
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }));
        return response;
    }

}