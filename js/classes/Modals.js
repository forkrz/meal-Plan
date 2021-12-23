import { Api } from './Api.js';
import { Validator } from './Validator.js';
import test from '../../temporary/test.js';

export class Modals {
    constructor() {
        this.api = new Api;
        this.Validator = new Validator;
    }
    displayModal = (modalName) => {
        modalName.classList.remove('hide');
    }

    hideModal = (modalName) => {
        modalName.classList.add('hide');
    }
    clearModalContent() {
        const modal = document.getElementById('modalContent');
        modal.innerHTML = "";
    }
    showGenerateMealPlansModal = (modalContainer, modalName) => {
        modalContainer.innerHTML = `<div class="modal__content">
        <header class="modal__header">
            <button class="material-icons modal__header__button" id="closeButton">close</button>
            <span class="modal__content__span">Preferences:</span>
        </header>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Choose a type of Diet:</label>
        <select name="typesOfDiets" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Primal">Primal</option>
            <option value="Low-FODMAP">Low-FODMAP</option>
            <option value="Whole30">Whole30</option>
        </select>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Plan for day/week:</label>
        <select name="mealPlanPeriod" class="modal__content__typesOfDiet__select" id="planLength">
            <option value="day">Day</option>
            <option value="week">Week</option>
        </select>
        <label for="calories" class="modal__content__typesOfDiet">Calories:</label>
        <input type="number" oninput="validity.valid||(value='');" name="calories" class="modal__content__typesOfDiet__input" id="calories">
        <span class="form_errorInfoModal hide" id="CaloriesErrorInfo">This field cannont be empty or equal to 0</span>
        <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
    </div>`
        this.displayModal(modalName);
    }
    showGetRandomRecipeModal = (modalContainer) => {
        modalContainer.innerHTML = `<div class="modal__content" id="modalContent">
        <header class="modal__header">
            <button class="material-icons modal__header__button" id="closeButton">close</button>
            <span class="modal__content__span" id="modalContentSpan">Preferences:</span>
        </header>
        <label for="typesOfDiet" class="modal__content__typesOfDiet">Choose a type of Diet:</label>
        <select name="typesOfDiets" class="modal__content__typesOfDiet__select" id="typeOfDietSelect">
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Ketogenic">Ketogenic</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Lacto-Vegetarian">Lacto-Vegetarian</option>
            <option value="Ovo-Vegetarian">Ovo-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Primal">Primal</option>
            <option value="Low FODMAP">Low FODMAP</option>
            <option value="Whole30">Whole30</option>
        </select>
        <label for="typesOfCuisines" class="modal__content__typesOfDiet">Choose a type of cuisine:</label>
        <select name="typesOfCuisines" class="modal__content__typesOfDiet__select" id="typesOfCuisines">
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern-European</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
            <option value="Mexican">Mexican</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
        </select>
        <label for="typesOfMeals" class="modal__content__typesOfDiet">Choose a type of meal:</label>
        <select name="typesOfMeals" class="modal__content__typesOfDiet__select" id="typesOfMeals">
            <option value="breakfast">breakfast</option>
            <option value="soup">soup</option>
            <option value="main-course">main-course</option>
            <option value="salad">salad</option>
            <option value="fingerfood">fingerfood</option>
            <option value="snack">snack</option>
            <option value="fingerfood">fingerfood</option>
            <option value="drink">drink</option>
            <option value="beverage">beverage</option>
            <option value="bread">bread</option>
        </select>
        <div class = "modal__content_buttonIconContainer" id="buttonIconContainer">
            <button class="form__button form__button--modal" id="generateMealPlanbutton">generate</button>
        </div>
        <span class="form_errorInfoModal hide" id="FinalError"></span>
    </div>`
        this.displayModal(modalContainer);
    }

    getRandomRecipeIfSuccessReplaceHTMLElemnts = () => {
        const container = document.getElementById('buttonIconContainer')
        const icon = document.createElement('button');
        icon.innerHTML = '<span class="material-icons nextModalPage" id="nextModalPage">east</span>';
        const button = container.firstChild;
        container.replaceChildren(icon, button);
    }

    getRandomRecipeModalHandler = (modalContainer, modalName) => {
        this.showGetRandomRecipeModal(modalContainer, modalName);
        const modalContent = document.getElementById('modalContent');
        const closeButton = document.getElementById('closeButton');
        const getRandomRecipeButton = document.getElementById('generateMealPlanbutton');
        const dietType = document.getElementById('typeOfDietSelect');
        const cuisineType = document.getElementById('typesOfCuisines');
        const mealsType = document.getElementById('typesOfMeals');
        const errorBox = document.getElementById('FinalError');
        const modalContentSpan = document.getElementById('modalContentSpan');
        modalContent.style.minWidth = 0;
        modalContent.style.maxWidth = "33%";
        modalContentSpan.style.marginLeft = "3rem";
        getRandomRecipeButton.addEventListener('click', () => {
            if (this.Validator.getRandomRecipeHandler(dietType.value, cuisineType.value, mealsType.value, errorBox)) {
                this.getRandomRecipeIfSuccessReplaceHTMLElemnts();
                const nextModalPage = document.getElementById('nextModalPage');
                nextModalPage.addEventListener('click', () => {
                    this.showGeneratedRandomMeals(modalContent);
                })
            }
        })

        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal(modalContainer);
        });
    }

    GenerateMealPlanmodalHandler = (modalContainer, modalName) => {
        this.showGenerateMealPlansModal(modalContainer, modalName);

        const generateMealPlanbutton = document.getElementById('generateMealPlanbutton');
        const closeButton = document.getElementById('closeButton');
        const dietType = document.getElementById('typeOfDietSelect');
        const planLength = document.getElementById('planLength');
        const calories = document.getElementById('calories');
        const caloriesErrorBox = document.getElementById('CaloriesErrorInfo');
        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal(modalContainer);
        });

        calories.addEventListener('keyup', () => {
            this.Validator.caloriesInputVisualValidation(calories.value, caloriesErrorBox);
        });

        generateMealPlanbutton.addEventListener('click', () => {
            this.Validator.generateMealPlanStatusHander(dietType.value, planLength.value, calories.value, caloriesErrorBox);
        });
    }

    getPrepInstructionForOneRecipe = (numberOfRecipe, meals) => {
        const instruction = meals[numberOfRecipe]['INSTRUCTION'];
        return instruction;
    }

    getSpecifiedIngredientsDataForOneRecipe = (numberOfRecipe, atribute, meals) => {
        const extendedIngredients = meals[numberOfRecipe]['INGRIDIENTS'];
        return extendedIngredients;
    };

    showPrepInstructionForOneMeal = (numberOfRecipe, meals) => {
        modalContent.insertAdjacentHTML('beforeend', '<span class="listOfIngridents__header">Instruction:</span>' + '<span class="recipeConatiner">' + this.getPrepInstructionForOneRecipe(numberOfRecipe, meals) + '</span>')
    }

    showPrepTimeAndQtyOfServings = (numberOfRecipe, meals) => {
        modalContent.insertAdjacentHTML('beforeend', '<div class="PrepTimeServings"><span class="PrepTimeServings__span">Time to prepare: ' + meals[numberOfRecipe]['PREPTIME'] + 'min' + '</span><span class="PrepTimeServings__span">Servings:' + meals[numberOfRecipe]['SERVINGS'] + '</span></div>')
    }

    showReicpeDetailInfo = (atribute, numberOfRecipe, meals) => {
        const modalContent = document.getElementById('modalContent');
        const modal = document.getElementById('modal');
        let i = 0;
        modalContent.style.minWidth = 10;
        console.log(meals);
        modalContent.insertAdjacentHTML('beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>' + '<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">' + meals[numberOfRecipe].TITLE + '</span><span class="listOfIngridents__header">Ingridients:</span></ul>');
        const list = document.getElementById('listOfIngridents');
        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute, meals);
        const listelement = list.appendChild(document.createElement('li'));
        listelement.insertAdjacentHTML('beforeend', ingirdientsData);

        this.showPrepTimeAndQtyOfServings(numberOfRecipe, meals);
        this.showPrepInstructionForOneMeal(numberOfRecipe, meals);
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            modalContent.innerHTML = "";
            modal.classList.add('hide');
        })
    }

    addList = (modalContent) => {
        modalContent.insertAdjacentHTML('beforeend',
            `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
    }

    showTitleOfRandomRecipeAndLinks = (element, n) => {
        const list = document.getElementById('randomRecpiesList');

        if (element.TITLE.length >= 12) {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element" id="randomRecpiesListElement' + n + '">' + '<span class="randomRecpiesList__element__span">' +
                element.TITLE.substring(0, 12) + '...' + "</span>" +
                '<button class="randomRecpiesList__element__button" id="showRecipe' + n + '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' + '<span class="form_errorInfoModal hide" id="FinalError"></span>' + '</li>');
        } else {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element">' + element.TITLE +
                '<button class="randomRecpiesList__element__button" id="showRecipe' + n + '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' + '</li>');
        }
    }

    showTitleOfRecipeAndLinksForMealPlan = (element, n) => {
        const list = document.getElementById('randomRecpiesList');
        if (element.TITLE.length >= 15) {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element" id="randomRecpiesListElement' + n + '">' + '<span class="randomRecpiesList__element__span RecipeFromMealPlan">' +
                element.TITLE.substring(0, 15) + '...' + "</span>" +
                '<button class="randomRecpiesList__element__button RecipeFromMealPlan" id="showRecipeMealPlan' + n + '" >Show recipe</button>' + '<span class="form_errorInfoModal hide" id="FinalError"></span>' + '</li>');
        } else {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element" id="randomRecpiesListElement' + n + '">' + '<span class="randomRecpiesList__element__span RecipeFromMealPlan">' +
                element.TITLE + "</span>" +
                '<button class="randomRecpiesList__element__button RecipeFromMealPlan" id="showRecipeMealPlan' + n + '" >Show recipe</button>' + '<span class="form_errorInfoModal hide" id="FinalError"></span>' + '</li>');
        }
    }

    convertArrayOfIngridientsToString(numberOfRecipe) {
        let ingr = [];
        meals[numberOfRecipe].extendedIngredients.forEach((ingirdient) => {
            ingr.push(ingirdient.originalString);
        })
        return String(ingr);
    }

    showGeneratedRandomMeals = (modalContent) => {
        const meals = test.recipes;
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.addList(modalContent);
        meals.forEach((el, n) => this.showTitleOfRandomRecipeAndLinks(el, n));
        modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies" id ="autorenew">autorenew</span>`)

        const showRecipe0 = document.getElementById('showRecipe0');
        const showRecipe1 = document.getElementById('showRecipe1');
        const showRecipe2 = document.getElementById('showRecipe2');
        const saveRecipe0 = document.getElementById('saveRecipe0');
        const saveRecipe1 = document.getElementById('saveRecipe1');
        const saveRecipe2 = document.getElementById('saveRecipe2');
        const errorBox = document.getElementById('FinalError');
        const closeButton = document.getElementById('closeButton');
        const modal = document.getElementById('modal');


        closeButton.addEventListener('click', () => {
            modal.innerHTML = "";
            modal.classList.add('hide');
        })

        showRecipe0.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 0);
        });
        showRecipe1.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 1);
        });
        showRecipe2.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 2);
        });

        saveRecipe0.addEventListener('click', () => {
            this.Validator.saveRandomRecipeHandler(meals[0].title, meals[0].readyInMinutes, meals[0].servings, this.convertArrayOfIngridientsToString(0), meals[0].instructions, errorBox, 0);
        })

        saveRecipe1.addEventListener('click', () => {
            this.Validator.saveRandomRecipeHandler(meals[1].title, meals[1].readyInMinutes, meals[1].servings, this.convertArrayOfIngridientsToString(1), meals[1].instructions, errorBox, 1);
        })

        saveRecipe2.addEventListener('click', () => {
            this.Validator.saveRandomRecipeHandler(meals[2].title, meals[2].readyInMinutes, meals[2].servings, this.convertArrayOfIngridientsToString(2), meals[2].instructions, errorBox, 2);
        })
    }

    mealsForOneMealPlan = async(planId) => {
        const records = await this.api.getMealsForOneMealPlan(planId);
        const recordsJson = await records.json();
        return recordsJson['meals'];
    }

    showMealsFromMealPlan = async(planId) => {
        const apiRes = await this.mealsForOneMealPlan(planId);
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.addList(modalContent);

        apiRes.forEach((el, n) => this.showTitleOfRecipeAndLinksForMealPlan(el, n));

        const closeButton = document.getElementById('closeButton');
        const modal = document.getElementById('modal');
        this.displayModal(modal);

        const showRecipe0 = document.getElementById('showRecipeMealPlan0');
        const showRecipe1 = document.getElementById('showRecipeMealPlan1');
        const showRecipe2 = document.getElementById('showRecipeMealPlan2');
        const errorBox = document.getElementById('FinalError');

        closeButton.addEventListener('click', () => {
            modalContent.innerHTML = "";
            modal.classList.add('hide');
        })

        showRecipe0.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 0, apiRes);
        });
        showRecipe1.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 1, apiRes);
        });
        showRecipe2.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 2, apiRes);
        });
    }


    showMealsFromRandomMealsList = async(minScope) => {
        const apiRes = await this.api.getRandomMealsAsPaginatedRecords(minScope);
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = "";
        modalContent.style.minWidth = 35 + "%";
        modalContent.style.maxWidth = 0;
        this.addList(modalContent);

        apiRes.forEach((el, n) => this.showTitleOfRecipeAndLinksForMealPlan(el, n));

        const closeButton = document.getElementById('closeButton');
        const modal = document.getElementById('modal');
        this.displayModal(modal);

        const showRecipe0 = document.getElementById('showRecipeMealPlan0');
        const showRecipe1 = document.getElementById('showRecipeMealPlan1');
        const showRecipe2 = document.getElementById('showRecipeMealPlan2');
        const errorBox = document.getElementById('FinalError');

        closeButton.addEventListener('click', () => {
            modalContent.innerHTML = "";
            modal.classList.add('hide');
        })

        showRecipe0.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 0, apiRes);
        });
        showRecipe1.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 1, apiRes);
        });
        showRecipe2.addEventListener('click', () => {
            modalContent.innerHTML = "";
            this.showReicpeDetailInfo('originalString', 2, apiRes);
        });
    }



    showDetailInforForRandomRecipe = async(mealId) => {
        getDeatilInfo = async(minScope) => {
            const records = await this.api.getRandomMealsAsPaginatedRecords(minScope);
            const recordsJson = await records.json();
            return recordsJson['meals'];
        }
    }

    showRandomReicpeDetailInfo = (atribute, numberOfRecipe, meals) => {
        const modalContent = document.getElementById('modalContent');
        const modal = document.getElementById('modal');
        let i = 0;
        modalContent.style.minWidth = 10;
        modalContent.insertAdjacentHTML('beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>' + '<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">' + meals[numberOfRecipe].title + '</span><span class="listOfIngridents__header">Ingridients:</span></ul>');
        const list = document.getElementById('listOfIngridents');
        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute, meals);
        const listelement = list.appendChild(document.createElement('li'));
        listelement.insertAdjacentHTML('beforeend', ingirdientsData);
        this.showPrepTimeAndQtyOfServings(numberOfRecipe, meals);
        this.showPrepInstructionForOneMeal(numberOfRecipe, meals);
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            modalContent.innerHTML = "";
            modal.classList.add('hide');
        })
    }

}