<?php
require_once '../init.php';
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

/* Use App-Manager variables to send out the email */
if ( isset( $session->config['wizard_email']['value'] ) )
	$customer['email'] = $session->config['wizard_email']['value'];

if ( isset( $session->config['wizard_company_name']['value'] ) )
	$customer['name'] = $session->config['wizard_company_name']['value'];

if ( isset( $session->config['email_subject']['value'] ) )
	$email['subject'] = $session->config['email_subject']['value'];

if ( isset( $session->config['email_body']['value'] ) )
	$email['body'] = $session->config['email_body']['value'];

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
