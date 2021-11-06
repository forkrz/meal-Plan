<?php

declare(strict_types=1);
require_once("Database.php");
require_once("Verification.php");
require_once("JWT.php");
class Api
{
    function __construct(array $config)
    {
        $this->db = new Database($config);
        $this->ver = new Verification($config);
        $this->JWT = new JWTTokens($config);
    }

    public function sendLoginData(string $login, $password)
    {
        if ($this->ver->loginDataCheck($login, $password)) {

            $jwt = $this->JWT->generateToken($login);
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Successful login.",
                    "jwt" => $jwt
                )
            );
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Login failed."));
        }
    }
}