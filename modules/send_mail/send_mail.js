/**
 * All functionality to send out a newsletter with double opt in 
 */

/**
 * This functions send out the confirmation email
 */
function send_mail(aa_inst_id, user_data) {

	var url = "modules/send_mail/send_mail.php?aa_inst_id=" + aa_inst_id;
	jQuery.post(url, user_data, function(response) {
		if (response.error == 0) {
			//callback;
		} else {
			//error
			//alert(response.error_msg);
		}
	}, 'json');
}