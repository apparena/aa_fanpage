<?php
/*
 * Setup the environment
 */
date_default_timezone_set('Europe/Berlin'); 		// Set timezone
ini_set('session.gc_probability',0); 				// Disable session expired check
header('P3P: CP=CAO PSA OUR'); 						// Fix IE save cookie in iframe problem
define("ROOT_PATH",realpath(dirname(__FILE__))); 	// Set include path
set_include_path(ROOT_PATH.'/libs/' . PATH_SEPARATOR );

/**
 * Include necessary libraries
 */
require_once ROOT_PATH.'/config.php';
require_once ROOT_PATH.'/libs/fb-php-sdk/3.2/src/facebook.php';
require_once ROOT_PATH.'/libs/AA/1.0/src/aa_helper.php';
require_once ROOT_PATH.'/libs/AA/1.0/src/AppManager.php';

/**
 * Connect to App-Arena.com App-Manager and init session
 */
$appmanager = new AA_AppManager(array(
	'aa_app_id'  => $aa_app_id,
	'aa_app_secret' => $aa_app_secret,
	'aa_inst_id' => getRequest("aa_inst_id")
));
$appmanager->setServerUrl('http://dev.app-arena.com/manager/server/soap4.php');

/**
 * Start session and initialize App-Manager content
 */
$aa_instance 	= $appmanager->getInstance(); // Load instance to init session with right instance id
$aa_scope 		= 'aa_' . $aa_instance['aa_inst_id'];
session_name( $aa_scope );
session_start();
$aa &= $_SESSION['aa'];
$aa['instance'] = $appmanager->getInstance();
$aa['config'] 	= $appmanager->getConfig();

/**
 * Initialize the translation management (Session and Cookie)
 */
$aa_locale_current = false;
if ( isset( $aa['instance']['aa_inst_locale'] ) ) { 
	$aa_locale_current = $aa['instance']['aa_inst_locale'];
}
if ( isset( $_COOKIE[ $aa_scope . "_locale" ] ) ) {
	$aa_locale_current = $_COOKIE[ $aa_scope . "_locale" ];
}
if ( $aa_locale_current ) {
	$aa->setLocale($aa_locale_current);
	$aa['locale'] = array();
	$aa['locale'][$aa_locale_current] = $appmanager->getTranslation($aa_locale_current);
	if ( !isset( $aa['locale'][$aa_locale_current] ) ) {
		$aa_locale = new Zend_Translate('array',$aa['locale'][0], $aa_locale_current);
	} else {
		$aa_locale = new Zend_Translate('array',$aa['locale'][$aa_locale_current], $aa_locale_current);
	}
	$aa_locale->setLocale($aa_locale_current);
	//$global->translate=$aa_locale;
}

/**
 * Initialize and set Facebook information in the session
 */
$aa['fb'] = array();
$fb_signed_request = parse_signed_request(getRequest('signed_request'));
$is_fb_user_admin = is_fb_user_admin();
$is_fb_user_fan = is_fb_user_fan();
$fb_data = array("is_fb_user_admin" => $is_fb_user_admin,
				"is_fb_user_fan" => $is_fb_user_fan,
				"app_data" => json_decode(urldecode(get_app_data()),true),
				"signed_request" => $fb_signed_request,
				);
if (isset($fb_signed_request['page']['id'])){
	$fb_data['fb_page_id'] = $fb_signed_request['page']['id'];
}
if (isset($fb_signed_request['user_id'])){
	$fb_data['fb_user_id'] = $fb_signed_request['user_id'];
}
foreach($fb_data as $k=>$v)
{
   $aa['fb'][$k] = $v;
}
$aa['fb']['share_url'] = "https://apps.facebook.com/" . $aa['instance']['fb_app_url']."/libs/AA/fb_share.php?aa_inst_id=".$aa['instance']['aa_inst_id'];
?>