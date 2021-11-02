<?php

declare(strict_types=1);
require_once "../php/classes/Database.php";
$config = require_once './config/config.php';
$data = new Database($config);