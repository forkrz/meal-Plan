import { Api } from "./Api.js";

export class HtmlElements {
    constructor() {
        this.api = new Api();
    }
    createSuccessIcon(li, saveIcon) {
        const span = document.createElement('span');
        span.className = "material-icons"
        span.id = 'successIcon'
        span.innerHTML = '<i class="material-icons getNewRandomRecpies">check</i>'
        li.replaceChild(span, saveIcon)
    }

    hideModal = () => {
        const modal = document.getElementById('modal');
        modal.classList.add('hide');
    }

    createGenerateMealPlansModal = (modalContainer) => {
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
    }

    createGetRandomRecipeModal = (modalContainer) => {
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
    }
    replaceGetMealsButtonWithLeftArrowIcon = () => {
        const container = document.getElementById('buttonIconContainer')
        const icon = document.createElement('button');
        icon.innerHTML = '<span class="material-icons nextModalPage" id="nextModalPage">east</span>';
        const button = container.firstChild;
        container.replaceChildren(icon, button);
    }

    closeIconAddEvenListener = (modalContainer) => {
        const closeButton = document.getElementById('closeButton');
        closeButton.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            this.hideModal();
        });
    }

    createDetailedInfoForOneMeal = (titleOfTheRecipe) => {
        modalContent.insertAdjacentHTML(`'beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>'
        ` + `'<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">'
        ` + titleOfTheRecipe + `'</span><span class="listOfIngridents__header">Ingridients:</span></ul>'`);
    }

    insertIngredientsData = (listOfingredients) => {
        const list = document.getElementById('listOfIngridents');
        const listelement = list.appendChild(document.createElement('li'));
        listelement.insertAdjacentHTML('beforeend', listOfingredients);
    }

    insertPrepTimeAndQtyOfServings = (prepTime, servings) => {
        modalContent.insertAdjacentHTML(`'beforeend', '<div class="PrepTimeServings"><span class="PrepTimeServings__span">Time to prepare: '` +
            prepTime + 'min' + '</span><span class="PrepTimeServings__span">Servings:' + servings + '</span></div>')
    }

    insertPrepInstructionForOneMeal = (prepInstruction) => {
        modalContent.insertAdjacentHTML(`'beforeend', '<span class="listOfIngridents__header">Instruction:</span>'` +
            '<span class="recipeConatiner">' + prepInstruction + '</span>')
    }

    createListWithRecipesToTable = (modalContent) => {
        modalContent.insertAdjacentHTML('beforeend',
            `<button class="material-icons modal__header__button" id="closeButton">close</button>
        <span class="randomRecpiesSpan">Recipes:</span>
        <ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
    }


    createListWithRecipesToTableForRegeneratedRandomMeals = (modalContent) => {
        modalContent.insertAdjacentHTML('beforeend',
            `<ul class="randomRecpiesList" id="randomRecpiesList"></ul>`)
    }

    createTitleOfRecipeAndLinksForGeneratedRandomRecipes = (element, n, numberOfCharsToDisplay) => {
        const list = document.getElementById('randomRecpiesList');
        if (element.length >= numberOfCharsToDisplay) {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element" id="randomRecpiesListElement' + n + '">' +
                '<span class="randomRecpiesList__element__span RecipeFromMealPlan">' +
                element.substring(0, numberOfCharsToDisplay) + '...' + "</span>" +
                '<button class="randomRecpiesList__element__button RecipeFromMealPlan" id="showRecipeMealPlan' + n +
                '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' +
                '<span class="form_errorInfoModal hide" id="FinalError"></span>' + '</li>');
        } else {
            list.insertAdjacentHTML('beforeend', '<li class="randomRecpiesList__element" id="randomRecpiesListElement' + n + '">' +
                '<span class="randomRecpiesList__element__span RecipeFromMealPlan">' +
                element + "</span>" +
                '<button class="randomRecpiesList__element__button RecipeFromMealPlan" id="showRecipeMealPlan' + n +
                '" >Show recipe</button>' + '<button class="randomRecpiesList__element__button" id="saveRecipe' + n + '">Save</button>' +
                '<span class="form_errorInfoModal hide" id="FinalError"></span>' + '</li>');
        }
    }


    showRecipeDetailInfoAddEventListener = (buttonId) => {
        buttonId.addEventListener('click', () => {
            modalContent.innerHTML = "";
            /*to be added*/
        });
    }

    getDataForRandomMealsFromLocalStorage = (itemName) => {
        const res = localStorage.getItem(itemName);
        const resJSON = JSON.parse(res);
        return resJSON['recipes'];
    }

    createListElements = (recipesData) => {
        recipesData.forEach((el, n) => {
            this.createTitleOfRecipeAndLinksForGeneratedRandomRecipes(el['title'], n, 10);
        });
    }
    createNewRandomRecipesIcon = (modalContent) => {
        modalContent.insertAdjacentHTML('beforeend', `<span class="material-icons getNewRandomRecpies" id ="autorenew">autorenew</span>'`);
    }

    storeDietPreferencesForGeneratingRandomMeals = (dietType, cuisineType, mealType) => {
        const data = [
            { dietType: dietType },
            { cuisineType: cuisineType },
            { mealType: mealType }
        ]

        const dataStringify = JSON.stringify(data);
        localStorage.setItem('RandomMealsPreferences', dataStringify);
    }

    createListOfIngridientsAndTitleForDetailedInfo = (modalContent, title) => {
        modalContent.insertAdjacentHTML('beforeend', '<button class="material-icons modal__header__button" id="closeButton">close</button>' +
            '<ul class="ingirdients" id="listOfIngridents"><span class="listOfIngridents__header">' +
            title + '</span><span class="listOfIngridents__header">Ingridients:</span></ul>');
    }

    fillListOfIngridientsForDetailInfo = () => {
        const list = document.getElementById('listOfIngridents');
        const ingirdientsData = this.getSpecifiedIngredientsDataForOneRecipe(numberOfRecipe, atribute, meals);
        const listelement = list.appendChild(document.createElement('li'));
        listelement.insertAdjacentHTML('beforeend', ingirdientsData);
    }

    showReicpeDetailInfo = (modalContent, title) => {
        modalContent.style.minWidth = 10;
        this.createListOfIngridientsAndTitleForDetailedInfo(modalContent, title);

        this.showPrepTimeAndQtyOfServings(numberOfRecipe, meals);
        this.showPrepInstructionForOneMeal(numberOfRecipe, meals);
    }
}