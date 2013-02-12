<?php
require_once( 'Zend/Mail.php' );
require_once( 'Zend/Mail/Transport/Smtp.php' );

class Newsletter {

	private $db; // DB connection
	private $smtp_host = "localhost";
	private $smtp_port = 587;
	private $smtp_user = "none";
	private $smtp_pass = "none";
	private $sender_name = "";
	private $sender_email = "";
	private $aa_inst_id;
	
	/**
	 * Initializes a Mail object to send out a mail.
	 * @param array $smtp Smtp access data as an array: (host, port, user, pass)
	 * @param int $aa_inst_id App Arena Instance Id
	 * @param array $sender Email sender data: (name, email) of the user who sent the form
	 */
	function __construct($smtp=array(), $aa_inst_id=0, $sender=array()) {
		
		if (array_key_exists('host', $smtp))
			$this->smtp_host = $smtp['host'];
		
		if (array_key_exists('port', $smtp))
			$this->smtp_port = $smtp['port'];
		
		if (array_key_exists('user', $smtp))
			$this->smtp_user = $smtp['user'];
		
		if (array_key_exists('host', $smtp))
			$this->smtp_pass = $smtp['pass'];
		
		if ($aa_inst_id != 0)
			$this->aa_inst_id = $aa_inst_id; 
		
		$this->set_sender($sender);
	}

	/**
	 * Send a mail to the customer. This email contains user data from the contact form.
	 * @param array $receiver (name, email) Array with all receiver information.
	 * @param array $email (subject, body) The email content templates.
	 * @return boolean Returns if email could be sent out or not.
	 */
	function send_email($receiver=array(), $email=array()) {
		
		$str_receiver = base64_encode(json_encode($receiver));
		
		// Get email content
		if (array_key_exists('body', $email))
			$email_body = $email['body'];
		else $email_body = "";
		if (array_key_exists('subject', $email))
			$email_subject = $email['subject'];
		else $email_subject = "";
		
		// Get receiver data
		if (array_key_exists('name', $receiver))
			$receiver_name = $receiver['name'];
		else $receiver_name = "";
		if (array_key_exists('email', $receiver))
			$receiver_email = $receiver['email'];
		else $receiver_email = "";
		
		// Replace variables in Email-text
		$email_body = str_replace("{{name}}", $receiver_name, $email_body);

		// Setup Zend SMTP server
		$smtp_config = array(
			'ssl'	   =>'tls',
			'username' => $this->smtp_user, 
			'password' => $this->smtp_pass,
			'port'	   => $this->smtp_port,
			'auth'	   => 'login'
		);
		$transport = new Zend_Mail_Transport_Smtp($this->smtp_host, $smtp_config);

		$mail = new Zend_Mail('UTF-8');
		$mail->setBodyHtml($email_body);
		$mail->setFrom($this->sender_email, $this->sender_name);
		$mail->addTo($receiver_email, $receiver_name);
		$mail->setSubject($email_subject);

		try{
			$return = $mail->send($transport);
			return true;
		} catch(Exception $e) {
			//send mail failed
			$return_msg = "<strong>Receiver: </strong>" . var_dump($receiver);
			$return_msg .= "<strong>Email: </strong>" . var_dump($email);
			$return_msg .= "<strong>SMT-Settings: </strong>" . var_dump($smtp_config) . "Smtp-Host: " . $this->smtp_host;
			return $return_msg . $e->getMessage();
		}
	}
	
	/**
	 * Sets the sender for all sent out emails
	 * @param array $sender
	 */
	function set_sender($sender=array()) {
		if (array_key_exists('name', $sender))
			$this->sender_name = $sender['name'];
		
		if (array_key_exists('email', $sender))
			$this->sender_email = $sender['email'];;
	}
	
	
	/**
	 * Returns the IP of the client
	 * @return String client ip
	 */
	private function get_client_ip(){
		// Get client ip address
		if ( isset($_SERVER["REMOTE_ADDR"]))
			$client_ip = $_SERVER["REMOTE_ADDR"];
		else if ( isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
			$client_ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
		else if ( isset($_SERVER["HTTP_CLIENT_IP"]))
			$client_ip = $_SERVER["HTTP_CLIENT_IP"];
	
		return $client_ip;
	}

}
