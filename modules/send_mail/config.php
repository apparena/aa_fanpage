<?php
// DB Setup (not needed?!)
// global $db2;

//SMTP Setup
$smtp_config = array(
	"host" => "smtp.mandrillapp.com",
	"user" => "s.buckpesch@iconsultants.eu",
	"pass" => "ZOHQCYR6NDH5pt6RFPFLIw",
	"port" => "587"
);

// Sender settings
$sender = array(
	"name" 	=> "App-Arena.com Developer",
	"email" => "info@app-arena.com"
);

// Default email settings
$email = array(
	"subject" => "Facebook Fanpage Email",
	"body" 	  => "Thank you {{name}}."
);

?>