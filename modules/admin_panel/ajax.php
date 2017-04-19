<?php
require_once dirname(__FILE__) . '/../init.php';


$ajax = new Frd_Ajax();
$ajax->setFolder(dirname(__FILE__) . '/ajax');
$ajax->setActionParam("action");
$ajax->addRequiredParam("i_id");

$ajax->run();
