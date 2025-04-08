<?php
header('Content-Type: text/css');

$config = simplexml_load_file('config.xml');
$colors = $config->colors;
$background = $colors->background;
$text = $colors->text;
$sidebar_background = $colors->sidebar_background;
$sidebar_text = $colors->sidebar_text;
$sidebar_hover = $colors->sidebar_hover;
$sidebar_hover_text = $colors->sidebar_hover_text;
$button_background = $colors->button_background;
$button_text = $colors->button_text;
?>
:root {
  --background-color: <?= $background ?>;
  --text-color: <?= $text ?>;
  --sidebar-background: <?= $sidebar_background ?>;
  --sidebar-text: <?= $sidebar_text ?>;
  --sidebar-hover: <?= $sidebar_hover ?>;
  --sidebar-hover-text: <?= $sidebar_hover_text ?>;
  --button-background: <?= $button_background ?>;
  --button-text: <?= $button_text?>;
}