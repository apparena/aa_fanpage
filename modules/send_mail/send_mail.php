<?php
require_once '../../init.php';
require_once 'config.php';
require_once 'SendMail.php';

/*
$receiver = array();
$receiver['email'] 	= $_POST['receiver_email'];
$receiver['name']	= $_POST['receiver_name'];
*/

$user_data = array();
if ( isset( $_POST[ 'user_data' ] ) ) {
	$user_data = $_POST[ 'user_data' ];
} else {
	echo json_encode( array( 'error' => 'missing user data' ) );
	exit( 0 );
}

$customer = array();

/* Use App-Manager variables to send out the email */
if ( isset( $aa['config']['wizard_email']['value'] ) )
	$customer['email'] = $aa['config']['wizard_email']['value'];

if ( isset( $aa['config']['wizard_company_name']['value'] ) )
	$customer['name'] = $aa['config']['wizard_company_name']['value'];

if ( isset( $aa['config']['contactform_email_subject']['value'] ) )
	$email['subject'] = $aa['config']['contactform_email_subject']['value'];

if ( isset( $aa['config']['contactform_email_body']['value'] ) )
	$email['body'] = $aa['config']['contactform_email_body']['value'];

// Init newsletter object and send email
$mail = new SendMail($smtp_config, $_GET['aa_inst_id'], $customer, $user_data);
$ret = $mail->send_email($email);

/*if($ret == true) {
   var_dump($ret);
} else {
	echo "Newsletter wurde nicht verschickt.";
  var_dump($ret);
}*/

?>
