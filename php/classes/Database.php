<?php

declare(strict_types=1);

class Database
{
    function __construct(array $config)
    {
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
}