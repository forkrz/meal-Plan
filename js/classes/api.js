export class Api {
    constructor(login, password) {

        this.login = login;
        this.password = password;
    }

    sendAuthData = async() => {
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
        return response;
    }

    loginHandler = async() => {
        const res = await this.sendAuthData();
        console.log(res);
        if (res.status === 200) {
            return true;
        } else {
            return false;
        }
    }
}