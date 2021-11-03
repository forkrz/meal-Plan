export class Validator {
    constructor(login, password, loginErrorInfo, passwordErrorInfo) {
        this.login = login,
            this.password = password,
            this.loginErrorInfo = loginErrorInfo,
            this.passwordErrorInfo = passwordErrorInfo
    }

    loginLengthValidation = () => {
        if (login.value.length >= 6 && login.value.length <= 256) {
            return true;
        } else {
            return false;
        }
    }

    passwordLengthValidation() {
        if (password.value.length >= 8 && password.value.length <= 160) {
            return true
        } else {
            return false;
        }
    }

    passwordLowerCaseCheck() {
        const regex = "(?=.*[a-z])";

        if (password.value.match(regex)) {
            return true;
        } else {
            return false
        }
    }
    passwordUperCaseCheck() {
        const regex = "(?=.*[A-Z])";
        if (password.value.match(regex)) {
            return true;
        } else {
            return false
        }
    }

    passwordNumCheck() {
        const regex = "(?=.*[0-9])";
        if (password.value.match(regex)) {
            return true;
        } else {
            return false
        }
    }
    passwordSpecialCharCheck() {
        const regex = "(?=.*[!@#$%^&*])";
        if (password.value.match(regex)) {
            return true;
        } else {
            return false
        }
    }



    loginVisualValidation = () => {
        if (!this.loginLengthValidation()) {
            loginErrorInfo.classList.remove('hide');
            login.classList.remove('form__input');
            login.classList.add('form__input--modifier');
            return false;
        } else {
            loginErrorInfo.classList.add('hide');
            login.classList.remove('form__input--modifier');
            login.classList.add('form__input');
            return true;
        }
    }
    passwordVisualValidation = () => {
        console.log(this.passwordLowerCaseCheck());
        if (!this.passwordLengthValidation()) {
            passwordErrorInfo.innerText = "Password must have legth between 8 and 160 characters.";
            passwordErrorInfo.classList.remove('hide');
            password.classList.remove('form__input');
            password.classList.add('form__input--modifier');
            return false;
        }
        if (!this.passwordLowerCaseCheck()) {
            passwordErrorInfo.innerText = "Password must have at least one lower case character."
            passwordErrorInfo.classList.remove('hide');
            password.classList.remove('form__input');
            password.classList.add('form__input--modifier');
            return false;
        }
        if (!this.passwordUperCaseCheck()) {
            passwordErrorInfo.innerText = "Password must have at least one uper case character."
            passwordErrorInfo.classList.remove('hide');
            password.classList.remove('form__input');
            password.classList.add('form__input--modifier');
            return false;
        }
        if (!this.passwordNumCheck()) {
            passwordErrorInfo.innerText = "Password must have at least one number character."
            passwordErrorInfo.classList.remove('hide');
            password.classList.remove('form__input');
            password.classList.add('form__input--modifier');
            return false;
        }
        if (!this.passwordSpecialCharCheck()) {
            passwordErrorInfo.innerText = "Password must have at least one special character."
            passwordErrorInfo.classList.remove('hide');
            password.classList.remove('form__input');
            password.classList.add('form__input--modifier');
            return false;
        } else {
            passwordErrorInfo.classList.add('hide');
            password.classList.remove('form__input--modifier');
            password.classList.add('form__input');
            return true;
        }
    }

}