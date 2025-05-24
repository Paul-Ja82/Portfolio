<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, responseType");
    header("Access-Control-Max-Age: 86400");
    exit;


    case "POST":
        // Allow Angular to access response
        header("Access-Control-Allow-Origin: *");

        // Get JSON from request body
        $json = file_get_contents('php://input');
        $params = json_decode($json);

        // Extract values
        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        // Prepare email
        $recipient = 'pallone33@gmail.com';
        $subject = "Contact From <$email>";
        $message = "From: " . $name . "<br>" . $message;

        $headers = array();
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = "From: info@pauljdietrich.com";   // Muss eine echte existierende Adresse sein
        $headers[] = "Reply-To: $email";

        // Send mail
        $success = mail($recipient, $subject, $message, implode("\r\n", $headers));

        if ($success) {
            echo 'Mail gesendet';
        } else {
            http_response_code(500);
            echo 'Fehler beim Mailversand';
        }
        break;

    default:
        // Reject any non POST or OPTIONS requests
        header("Allow: POST", true, 405);
        exit;
}
