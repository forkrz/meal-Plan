<?php

declare(strict_types=1);
require_once("Database.php");

class Pagination
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
    }

    private function getMinMeals(int $min, int $totalRecords): int
    { {
            if ($min < 10) {
                return 0;
            } elseif ($min > $totalRecords) {
                return $totalRecords - $totalRecords % 10;
            } else {
                return $min;
            }
        }
    }

    private function getMaxMeals(int $max, int $totalRecords): int
    {
        if ($max > $totalRecords) {
            return $totalRecords;
        } else {
            return $max;
        }
    }

    public function getMeals(string $login, int $minScope, int $maxScope,)
    {
        $totalRecords = $this->db->getTotalQuantityOfPlansForUser($login);
        $minMeals = $this->getMinMeals($minScope, $totalRecords);
        $maxMeals = $this->getMaxMeals($maxScope, $totalRecords);
        $mealsData = $this->db->getPaginatedRecords($login, $minMeals, $maxMeals);
        return $mealsData;
    }
}