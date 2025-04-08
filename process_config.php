<?php
header('Content-Type: application/json');

$config = simplexml_load_file('config.xml');
if (!$config) {
    echo json_encode(['success' => false, 'message' => 'Error al cargar el archivo de configuración']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos']);
    exit;
}

$colors = $config->colors;
$colors->background = $data['background'];
$colors->text = $data['text'];
$colors->sidebar_background = $data['sidebar_background'];
$colors->sidebar_text = $data['sidebar_text'];
$colors->sidebar_hover = $data['sidebar_hover'];
$colors->sidebar_hover_text = $data['sidebar_hover_text'];
$colors->button_background = $data['button_background'];
$colors->button_text = $data['button_text'];

if ($config->asXML('config.xml')) {
    echo json_encode(['success' => true, 'message' => 'Configuración guardada correctamente']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar la configuración']);
}