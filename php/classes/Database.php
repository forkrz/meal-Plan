<?php

declare(strict_types=1);
require_once 'MealPlans.php';
class Database
{
    function __construct(array $config)
    {
        $this->meal = new Meals();
        try {
            $dsn = "mysql:host={$config['host']};dbname={$config['dbname']}";
            $this->con = new PDO($dsn, $config['user'], $config['password']);
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    public function getData(string $login)
    {
        $query = "SELECT * FROM users WHERE USER_LOGIN =:USER_LOGIN";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function addOneDayMealPlan(array $array, string $login)
    {
        $query = "INSERT INTO meal_plans (CALORIES,PROTEINS,FATS,CARBOHYDRATES,USER_LOGIN) VALUES (:CALORIES, :PROTEINS, :FATS, :CARBOHYDRATES, :USER_LOGIN)";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':CALORIES', $array['nutrients']['calories']);
        $statement->bindParam(':PROTEINS', $array['nutrients']['protein']);
        $statement->bindParam(':FATS', $array['nutrients']['fat']);
        $statement->bindParam(':CARBOHYDRATES', $array['nutrients']['carbohydrates']);
        $statement->bindParam(':USER_LOGIN', $login);
        if ($statement->execute()) {
            $this->addMeals($array, $login);
            return true;
        } else {
            return false;
        }
    }

    function console_log($message)
    {
        $STDERR = fopen("php://stderr", "w");
        fwrite($STDERR, "\n" . $message . "\n\n");
        fclose($STDERR);
    }

    public function addMealPlansforWholeWheek(array $array, string $login)
    {
        foreach ($array['week'] as $day) {
            $query = "INSERT INTO meal_plans (CALORIES,PROTEINS,FATS,CARBOHYDRATES,USER_LOGIN) VALUES (:CALORIES, :PROTEINS, :FATS, :CARBOHYDRATES, :USER_LOGIN)";
            $statement = $this->con->prepare($query);
            $statement->bindParam(':CALORIES', $day['nutrients']['calories']);
            $statement->bindParam(':PROTEINS', $day['nutrients']['protein']);
            $statement->bindParam(':FATS', $day['nutrients']['fat']);
            $statement->bindParam(':CARBOHYDRATES', $day['nutrients']['carbohydrates']);
            $statement->bindParam(':USER_LOGIN', $login);
            if ($statement->execute()) {
                $this->addMeals($day, $login);
            } else {
                return false;
            }
        }
    }

    private function getLatestMealPLanID(string $login)
    {
        $query = "SELECT MAX(PLAN_ID) FROM meal_plans WHERE USER_LOGIN =:USER_LOGIN";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        return $result["MAX(PLAN_ID)"];
    }

    private function getSpeicfiedDataForRecipes($mealId)
    {
        $data = $this->meal->getMoreInforForRecipeFromMealsPlan($mealId);
        return $data;
    }

    private function convertArrayOfIngridientsToString($extData)
    {
        $arr = [];
        foreach ($extData['extendedIngredients'] as $ingridient) {
            array_push($arr, $ingridient['name']);
        }
        $finalString = implode(',', $arr);

        return $finalString;
    }

    private function amendTextOfRecipe($extData)
    {
        $string = $extData['instructions'];
        $string = strip_tags($string);
        $string = trim(preg_replace('/\s+/', ' ', $string));
        return $string;
    }


    public function addMeals(array $array, string $login)
    {

        foreach ($array['meals'] as $meal) {
            $extData = $this->getSpeicfiedDataForRecipes($meal['id']);
            $amendedInstruction = $this->amendTextOfRecipe($extData);
            $ingridients = $this->convertArrayOfIngridientsToString($extData);
            $mealPlanId = $this->getLatestMealPLanID($login);
            $query = "INSERT INTO meals(PLAN_ID,TITLE,PREPTIME,SERVINGS,INGRIDIENTS,INSTRUCTION) VALUES (:PLAN_ID,:TITLE,:PREPTIME,:SERVINGS,:INGRIDIENTS,:INSTRUCTION)";
            $statement = $this->con->prepare($query);
            $statement->bindParam(':PLAN_ID', $mealPlanId);
            $statement->bindParam(':TITLE', $meal['title']);
            $statement->bindParam(':PREPTIME', $meal['readyInMinutes']);
            $statement->bindParam(':SERVINGS', $meal['servings']);
            $statement->bindParam(':INGRIDIENTS', $ingridients);
            $statement->bindParam(':INSTRUCTION', $amendedInstruction);
            $statement->execute();
        }
    }

    public function addMealPlansController(string $login, string $timeFrame, string $targetCalories, string $diet)
    {
        $array = $this->meal->generateMealPlan($timeFrame, $targetCalories, $diet);
        if ($timeFrame == "week") {
            if ($this->addMealPlansforWholeWheek($array, $login)) {
                return true;
            } else {
                return false;
            }
        } else {
            if ($this->addOneDayMealPlan($array, $login)) {
                return true;
            } else {
                return false;
            }
        }
    }

    public function saveRandomMeal(string $login, string $name, int $prepTime, int $servings, string $ingridients, string $instruction)
    {
        $query = "INSERT INTO random_meals(NAME,PREP_TIME,SERVINGS,INGRIDIENTS,INSTRUCTION,USER_LOGIN) VALUES (:NAME,:PREP_TIME,:SERVINGS,:INGRIDIENTS,:INSTRUCTION,:USER_LOGIN)";
        $statement = $this->con->prepare($query);
        $login = htmlspecialchars(strip_tags(($login)));
        $name = htmlspecialchars(strip_tags(($name)));
        $ingridients = htmlspecialchars(strip_tags(($ingridients)));
        $instruction = htmlspecialchars(strip_tags(($instruction)));
        $statement->bindParam(':NAME', $name);
        $statement->bindParam(':PREP_TIME', $prepTime);
        $statement->bindParam(':SERVINGS', $servings);
        $statement->bindParam(':INGRIDIENTS', $ingridients);
        $statement->bindParam(':INSTRUCTION', $instruction);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
    }




    public function getTotalQuantityOfPlansForUser(string $login): int
    {
        $query = "SELECT * FROM meal_plans WHERE USER_LOGIN =:USER_LOGIN";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $count = $statement->rowCount();
        return $count;
    }

    public function getTotalQuantityOfRandomMealsForUser(string $login): int
    {
        $query = "SELECT * FROM random_meals WHERE USER_LOGIN =:USER_LOGIN";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $count = $statement->rowCount();
        return $count;
    }

    public function getPaginatedRecords(string $login, int $min)
    {
        $query = "SELECT * FROM meal_plans WHERE USER_LOGIN =:USER_LOGIN LIMIT {$min}, 10";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getFirstRecordsPaginated($login)
    {
        $query = "SELECT * FROM meals INNER JOIN meal_plans On meals.PLAN_ID = meal_plans.PLAN_ID WHERE meal_plans.USER_LOGIN =:USER_LOGIN LIMIT 0,10";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
    public function getLastRecordsPaginated($login)
    {
        $recordsTotal = $this->getTotalQuantityOfPlansForUser($login);
        if ($recordsTotal < 10) {
            $minRecords = 0;
            $maxRecords = $recordsTotal;
        } else {
            $minRecords = $recordsTotal - 10;
            $maxRecords = $recordsTotal;
        }
        $query = "SELECT * FROM meals INNER JOIN meal_plans On meals.PLAN_ID = meal_plans.PLAN_ID WHERE meal_plans.USER_LOGIN =:USER_LOGIN LIMIT {$minRecords},{$maxRecords}";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getAllRecipesForMealPlan(string $planId)
    {
        $query = "SELECT * FROM meals WHERE PLAN_ID =:PLAN_ID";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':PLAN_ID', $planId);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getRandomMealsAsPaginatedRecords(string $login, int $min)
    {
        $query = "SELECT * FROM random_meals WHERE USER_LOGIN =:USER_LOGIN LIMIT {$min}, 10";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getDataForOneRandomMeal($mealId)
    {
        $query = "SELECT * FROM random_meals WHERE RANDOM_MEAL_ID =:RANDOM_MEAL_ID";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $mealId);
        $statement->execute();
        $result = $statement->fetchall(PDO::FETCH_ASSOC);
        return $result;
    }
}