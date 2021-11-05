import { Validator } from './classes/Validator.js';
import { Api } from './classes/Api.js';

const login = document.getElementById('login');
const password = document.getElementById('password');
const loginErrorInfo = document.getElementById('loginErrorInfo');
const passwordErrorInfo = document.getElementById('passwordErrorInfo');
const button = document.getElementById('button');



const Valid = new Validator(login, password, loginErrorInfo, passwordErrorInfo);
const Apii = new Api(login, password);
login.addEventListener('keyup', Valid.loginVisualValidation);
password.addEventListener('keyup', Valid.passwordVisualValidation);
button.addEventListener('click', Apii.sendData);