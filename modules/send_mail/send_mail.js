/**
 * All functionality to send out a newsletter with double opt in 
 */

/**
 * This functions send out the confirmation email
 */
function send_mail(i_id, user_data, callback) {

	var url = "modules/send_mail/send_mail.php?i_id=" + i_id;
	jQuery.post(url, {user_data: user_data}, function(response) {
		if ( typeof( response ) != 'undefined' ) {
			if ( typeof( response.error ) != 'undefined' ) {
				//callback;
			}
		} else {
			//error
			//alert(response.error_msg);
		}
		if ( typeof( callback ) == 'function' ) {
			callback( response );
		}
	}, 'json').fail(function() {
		if ( typeof( callback ) == 'function' ) {
			callback( {error: 'mail not sent'} );
		}
	});
}