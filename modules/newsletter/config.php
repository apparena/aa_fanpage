<?php
// DB Setup
global $db2;

//SMTP Setup
$smtp_config = array("host" => "smtp.mandrillapp.com",
					"user" => "s.buckpesch@iconsultants.eu",
					"pass" => "ZOHQCYR6NDH5pt6RFPFLIw",
					"port" => "587"
					);

// Sender settings
$sender = array("name" 	=> "App-Arena.com Developer",
				"email" => "info@app-arena.com",
);

// Default email settings
$email = array("subject" 	=> "Test Newsletter Registration",
				"body" 		=> "Thank you {{name}}. Confirm your registration here: {{confirmation_link}}",
);

?>