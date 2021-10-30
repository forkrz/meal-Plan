class Validator {
    constructor(login, password) {
        this.login = login,
            this.password = password
    }

    loginLengthValidation() {
        if (login.length >= 6 && login.length <= 256) {
            return true
        } else {
            return false;
        }
    }

    passwordLengthValidation() {
        if (password.length >= 8 && password.length <= 160) {
            return true
        } else {
            return false;
        }
    }

    passwordLowerCaseCheck() {
        const regex = "(?=.*[a-z])";
        if (regex.test(this.password)) {
            return true;
        } else {
            return false
        }
    }
    passwordUperCaseCheck() {
        const regex = "(?=.*[A-Z])";
        if (regex.test(this.password)) {
            return true;
        } else {
            return false
        }
    }

    passwordNumCheck() {
        const regex = "(?=.*[0-9])";
        if (regex.test(this.password)) {
            return true;
        } else {
            return false
        }
    }
    passwordSpecialCharCheck() {
        const regex = "(?=.*[!@#$%^&*])";
        if (regex.test(this.password)) {
            return true;
        } else {
            return false
        }
    }

    loginVisualValidation() {
        if (!this.loginLengthValidation) {
            return "Login must have legth between 6 and 256 characters."
        }
    }
    passwordVisualValidation() {
        if (!this.passwordLengthValidation) {
            return "Password must have legth between 8 and 160 characters."
        } else {

        }
        if (!this.passwordLowerCaseCheck) {
            return "Password must have at least one lower case character."
        } else {

        }
        if (!this.passwordUperCaseCheck) {
            return "Password must have at least one uper case character."
        } else {

        }
        if (!this.passwordNumCheck) {
            return "Password must have at least one number character."
        } else {

        }
        if (!this.passwordSpecialCharCheck) {
            return "Password must have at least one special character."
        } else {
            return true;
        }
    }
}