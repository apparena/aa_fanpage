/**
 * Author: Guntram Pollock & Sebastian Buckpesch
 */

/**
 * Loads a new template file into the div#main container using jquery animations
 * @param tmpl_filename Filename of the template
 * @param params Additional parameters to control the loading function (data, target, effect)
 *          data GET-Parameters which will be loaded as well.
 *          target css-selector to load the template in
 *          effect transition effect: can be slide, fade or switch
 */
function aa_tmpl_load( tmpl_filename, params ) {

    /* Extract and parse paramters */
    /* Check data param */
    if ( typeof( params ) != 'undefined' ) {
        if ( !params.hasOwnProperty('data') ) {
            data = '';
        } else {
            data = '&' + params['data'];
        }
        /* Loading target parameter */
        if ( !params.hasOwnProperty('target') ) {
            target = '#main';
        }else {
            target = params['target'];
        }
        /* Get effect if not possible */
        if ( !params.hasOwnProperty('effect') ) {
            effect = 'slidedown';
        }else {
            effect = params['effect'];
        }
    } else {
        data = '';
        target = '#main';
        effect = 'slidedown';
    }

    var url = "templates/" + tmpl_filename + "?aa_inst_id=" + aa.inst.aa_inst_id + data;
    if ( effect == 'fade' ) {
        $(target).fadeOut(0, function () {
            $(target).load( url, function () {
                $(target).fadeIn(600, function () {
                    //FB.Canvas.scrollTo(0, 0);
                });
            });
        });
    } else {
        show_loading(); // show the loading screen
        $(target).slideUp(0, function () {
            $(target).load( url, function () {
                $(target).slideDown(600, function () {
                    FB.Canvas.scrollTo(0, 0);
                    hide_loading(); // hide the loading screen
                });
            });
        });
    }
}

function open_popup( url, name ) {
    popup = window.open( url, name, 'target=_blank,width=820,height=800' );
    if ( window.focus ) {
        popup.focus();
    }
    return false;
}

function setAdminIntroCookie() {
    if ($('#admin-intro').is(':checked')) {
        setCookie('admin_intro_' + aa_inst_id, true);
    } else {
        setCookie('admin_intro_' + aa_inst_id, false);
    }
}

function show_admin_info() {
    $('#admin_modal').modal("show");
}


/**
 * Initialize the form.
 * Set translations and rules.
 */
function initValidation () {
	var aa_data = {};
    var messages = {
    	email: {
            required: aa.t.validation_enter_email,
            email: aa.t.validation_email_invalid
        },
        first_name: {
            required: aa.t.validation_enter_first_name,
            minlength: aa.t.validation_first_name_min.replace( '%s', '{0}' )
        },
        last_name: {
            required: aa.t.validation_enter_last_name,
            minlength: aa.t.validation_last_name_min.replace( '%s', '{0}' )
        }
    };
    $.register_bootstrap_form.messages = $.extend( $.register_bootstrap_form.messages, messages );

    var address_validation = {};
    // create address fields validation
    if ( typeof( aa.conf.custom_field_address_active.value ) != 'undefined' && aa.conf.custom_field_address_active.value == '1' ) {

        // add this field to the validation
        var required = false;
        if ( typeof( aa.conf.custom_field_address_required.value ) != 'undefined' && aa.conf.custom_field_address_required.value == '1' ) {
            required = true;
        
	        address_validation = {
	            street:{
	                required:required,
	                minlength:3
	            },
	            nr:{
	                required:required,
	                minlength:1
	            },
	            zip:{
	                required:required,
	                minlength:5,
	                maxlength:5,
	                number: true
	            },
	            city:{
	                required:required,
	                minlength:3
	            }
	        };
        }
        
        messages = {

        	street:{
                required: aa.t.validation_enter_street,
                minlength: aa.t.validation_street_minlength.replace( '%s', '{0}' )
            },
            nr:{
                required: aa.t.validation_enter_housenumber,
                minlength: aa.t.validation_housenumber_minlength.replace( '%s', '{0}' )
            },
            zip:{
                required: aa.t.validation_enter_zip,
                minlength: aa.t.validation_zip_not_valid_min,
                maxlength: aa.t.validation_zip_not_valid_max,
                number: aa.t.validation_zip_not_valid
            },
            city:{
                required:aa.t.validation_enter_city,
                minlength:aa.t.validation_city_not_valid.replace( '%s', '{0}' )
            }

        };
        
        $.register_bootstrap_form.rules = $.extend($.register_bootstrap_form.rules, address_validation);
        $.register_bootstrap_form.messages = $.extend($.register_bootstrap_form.messages, messages);
        

    } // end add address field if activated
}



/**
 * Disables all form elements in a certain area.
 * @param {String} formelement the selector for the area to disable.
 */
function disableForm ( formelement ) {
	formelement.find( 'select' ).each( function(index) {
		$(this).attr( 'disabled', 'disabled' );
	});
	formelement.find( 'input' ).each( function(index) {
		$(this).attr( 'disabled', 'disabled' );
	});
	formelement.find( 'button' ).each( function(index) {
		$(this).attr( 'disabled', 'disabled' );
	});
}

/**
 * Enables all form elements in a certain area.
 * @param {String} formelement The selector for the area to disable.
 */
function enableForm ( formelement ) {
	formelement.find( 'select' ).each( function(index) {
		$(this).removeAttr( 'disabled' );
	});
	formelement.find( 'input' ).each( function(index) {
		$(this).removeAttr( 'disabled' );
	});
	formelement.find( 'button' ).each( function(index) {
		$(this).removeAttr( 'disabled' );
	});
}

/**
 * Creates an object from a form.
 * Collects the data the user entered in the form.
 * @return {Object} The object containing the users entered data.
 */
$.fn.serializeObject = function () {
	var items = {};
	var form = this[ 0 ];
	for( var index = 0; index < form.length; index++ ) {
		var item = form[ index ];
		if ( typeof( item.type ) != 'undefined' && item.type == 'checkbox' ) {
			item.value = $(item).is( ':checked' );
		}
		if ( typeof( item.name ) != 'undefined' && item.name.length > 0 ) {
			items[ item.name ] = item.value;
		} else {
			if ( typeof( item.id ) != 'undefined' && item.id.length > 0 ) {
    			items[ item.id ] = item.value;
    		}
		}
	}
	return items;
};

function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}