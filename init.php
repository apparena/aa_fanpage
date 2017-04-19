<?php
/**
 * Setup the environment
 */
date_default_timezone_set( 'Europe/Berlin' ); // Set timezone
ini_set( 'session.gc_probability', 0 ); // Disable session expired check
header( 'P3P: CP=CAO PSA OUR' ); // Fix IE save cookie in iframe problem
define( "ROOT_PATH", realpath( dirname( __FILE__ ) ) ); // Set include path
set_include_path( ROOT_PATH . '/libs/' . PATH_SEPARATOR );

require __DIR__ . '/vendor/autoload.php';

/**
 * Include necessary libraries
 */
require_once ROOT_PATH . '/config.php';
require_once ROOT_PATH . '/libs/fb-php-sdk/3.2/src/facebook.php';
require_once ROOT_PATH . '/libs/AA/fb_helper.php';
require_once ROOT_PATH . '/libs/functions.php';
require_once ROOT_PATH . '/libs/AA/1.0/src/aa_helper.php';
require_once ROOT_PATH . '/libs/AA/1.0/src/AppManager.php';
require_once ROOT_PATH . '/libs/Zend/Translate.php';

/**
 * Connect to App-Arena.com App-Manager and init session
 */
$am = new \AppManager\AppManager(
	$aa_app_id,
	[
		"root_path" => ROOT_PATH,
		"cache_dir" => "/var/cache"
	]
);
// Get all necessary instance information to start working
$config      = $am->getConfigs();
$translation = $am->getTranslations();
$info        = $am->getInfos();

/**
 * Start session and initialize App-Manager content
 */
$aa_scope = 'aa_' . $am->getIId();
session_name( $aa_scope );
session_start();
$aa             = false;
$aa             =& $_SESSION;
$aa['instance'] = $am->getInfos();
$aa['config']   = $am->getConfigs();
