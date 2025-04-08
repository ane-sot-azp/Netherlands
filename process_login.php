<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
    $edad = filter_input(INPUT_POST, 'edad', FILTER_VALIDATE_INT);

    if ($nombre && $edad && $edad >= 1 && $edad <= 120) {
        $userData = [
            'nombre' => $nombre,
            'edad' => $edad,
            'timestamp' => time()
        ];

        $xmlFile = 'users.xml';
        if (!file_exists($xmlFile)) {
            $xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><users></users>');
        } else {
            $xml = simplexml_load_file($xmlFile);
        }

        $user = $xml->addChild('user');
        foreach ($userData as $key => $value) {
            $user->addChild($key, $value);
        }

        $xml->asXML($xmlFile);

        $_SESSION['user'] = $userData;
        header('Location: inicio.html');
        exit();
    } else {
        header('Location: index.html?error=invalid');
        exit();
    }
} else {
    header('Location: index.html');
    exit();
}