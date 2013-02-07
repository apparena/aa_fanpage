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
    if ( typeof( params ) != 'undefined' ) {
        /* Check data param */
        if ( typeof( params['data'] ) == 'undefined' ) {
            data = '';
        } else {
            data = '&' + params['data'];
        }
        /* Loading target parameter */
        if ( typeof( params['target'] ) == 'undefined' ) {
            target = '#main';
        }
        if ( typeof( params['effect'] ) == 'undefined' ) {
            effect = 'slidedown';
        }
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

function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}