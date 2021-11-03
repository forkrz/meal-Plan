<?php

declare(strict_types=1);
function tokenConfig($login)
{
    $token = array(
        "iat" => time(),
        "exp" => time() + (2 * 60 * 60),
        "iss" => "mp.localhost",
        "login" => $login,
    );

    return $token;
}