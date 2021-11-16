<?php

declare(strict_types=1);
require_once "./classes/Database.php";

class Pagination
{
    private function getCurrentPageNumber($totalRecords)
    {
        $page = $_GET['page'];
        if (!isset($_GET['page'])) {
            $page = 1;
            return $page;
        } elseif ($page > $totalRecords) {
            return $totalRecords;
        } else {
            return $page;
        }
    }

    public function getMinRecordOnPage($totalRecords)
    {
        $minRecordsOnPage = ($this->getCurrentPageNumber($totalRecords) - 1) * 10;
        return $minRecordsOnPage;
    }
    public function getMaxRecordOnPage($totalRecords)
    {
        $minRecordsOnPage = ($this->getCurrentPageNumber($totalRecords) - 1) * 10 + 10;
        return $minRecordsOnPage;
    }
}