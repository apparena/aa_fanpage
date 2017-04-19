<?php
$i_id = 0;
if (isset($_POST['i_id'])) {
    $i_id = $_POST['i_id'];
} else if (isset($aa['instance']['i_id'])) {
    $i_id = $aa['instance']['i_id'];
} else {
    echo "invalid session! exiting...";
    exit(0);
}
$_GET['i_id'] = $i_id;
include_once(dirname(__FILE__) . '/../../init.php');

$db = getDb();

$timestamp = "";

if (isset($_POST['timestamp'])) {
    $timestamp = $_POST['timestamp'];
}

if ($timestamp == "")
    $timestamp = date('Y-m-d H:i:s', time());

// Check if round reset recordset already exists in DB
$sql = "SELECT `config_value`
		FROM `app_config` 
		WHERE i_id=" . $i_id .
    " AND `config_key`='round_reset_timestamp'
		LIMIT 1";

// echo "1querying: ".$sql."<br />";

if ($db->fetchOne($sql)) {
    $sql = "UPDATE `app_config`
			SET `config_value` = '$timestamp'
			WHERE `config_key` = 'round_reset_timestamp' 
			AND `i_id` = '$i_id'
			LIMIT 1";
} else {
    $sql = "INSERT INTO `app_config`
				   (`i_id`,
					`config_key`,
					`config_value`)
			VALUES ('$i_id',
					'round_reset_timestamp',
					'$timestamp')";
}

// echo "2querying: ".$sql."<br />";
// query db and check if an error occurs
try {
    $db->query($sql);
} catch (Exception $e) {
    echo "false";
    exit(0);
}
echo "true";

?>