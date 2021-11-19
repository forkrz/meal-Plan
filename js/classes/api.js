export class Api {
    constructor(login, password) {

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
                CALORIES: calories
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }));
        return response;
    }

    generateMealPlanHander = async(diet, timeframe, calories) => {
        const res = await this.generateMealPlan(diet, timeframe, calories);
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }

    }
}