import { Validator } from './classes/Validator.js';

const login = document.getElementById('login')
const password = document.getElementById('password')
const loginErrorInfo = document.getElementById('loginErrorInfo')
const passwordErrorInfo = document.getElementById('passwordErrorInfo')




const Valid = new Validator(login, password, loginErrorInfo, passwordErrorInfo);
login.addEventListener('keyup', Valid.loginVisualValidation);
password.addEventListener('keyup', Valid.passwordVisualValidation);