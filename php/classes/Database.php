<?php

declare(strict_types=1);
require_once './classes/Pagination.php';
class Database
{
    function __construct(array $config)
    {
        $this->pagin = new Pagination();
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

    public function addMealPlan(float $calories, float $proteins, float $fats, float $carbohydrates, string $login)
    {
        $query = "INSERT INTO meal_plans (CALORIES,PROTEINS,FATS,CARBOHYDRATES,USER_LOGIN) VALUES (:CALORIES, :PROTEINS, :FATS, :CARBOHYDRATES, :USER_LOGIN)";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':CALORIES', $calories);
        $statement->bindParam(':PROTEINS', $proteins);
        $statement->bindParam(':FATS', $fats);
        $statement->bindParam(':CARBOHYDRATES', $carbohydrates);
        $statement->bindParam(':USER_LOGIN', $login);
        if ($statement->execute() ? true : false);
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


    public function addMeals(array $array, string $login)
    {
        foreach ($array as $meal) {
            $mealPlanId = $this->getLatestMealPLanID($login);
            $query = "INSERT INTO meals(PLAN_ID,TITLE,PREPTIME,SERVINGS) VALUES (:PLAN_ID,:TITLE,:PREPTIME,:SERVINGS)";
            $statement = $this->con->prepare($query);
            $statement->bindParam(':PLAN_ID', $mealPlanId);
            $statement->bindParam(':TITLE', $meal['title']);
            $statement->bindParam(':PREPTIME', $meal['readyInMinutes']);
            $statement->bindParam(':SERVINGS', $meal['servings']);
            if ($statement->execute() ? true : false);
        }
    }

    public function getTotalQuantityOfMealsForUser(string $login)
    {
        $query = "SELECT * FROM meals INNER JOIN meal_plans On meals.PLAN_ID = meal_plans.PLAN_ID WHERE meal_plans.USER_LOGIN =:USER_LOGIN";
        $statement = $this->con->prepare($query);
        $statement->bindParam(':USER_LOGIN', $login);
        $statement->execute();
        $count = $statement->rowCount();
        return $count;
    }

    public function getPaginatedRecords($login)
    {
        $query = "SELECT * FROM meals INNER JOIN meal_plans On meals.PLAN_ID = meal_plans.PLAN_ID WHERE meal_plans.USER_LOGIN =:USER_LOGIN LIMIT {$this->pagin->getMinRecordOnPage()}, {$this->pagin->getMaxRecordOnPage()}";
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
        $recordsTotal = $this->getPaginatedRecords($login);
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
}