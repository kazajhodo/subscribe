(function($) {	$(document).ready(function() {		// Form submit functionality - ajax submission - page loads are evil		$('.signup').submit(function() {			// update user interface while processing			$('.response').html('Adding information...').css({'background' : 'rgba(8,176,8,0.7)', 'color' : '#ffffff'}).delay(1200);			// Prepare query string and send AJAX request			$.ajax({				// Hits our controller which validates and sends information to mailchimp, received a response				url: '/subscribe/index/post',				data: 'ajax=true&email=' + escape($('#femail').val()),				success: function(msg) {					$('.response').html(msg);					if(msg == 'Success! Check your email to confirm sign up.'){						$('.response').css({'background' : 'rgba(8,176,8,0.7)', 'color' : '#ffffff'});						// Set a cookie of victory						$.cookie('subscribed', 'subscribed', { path: '/' });					}else{						$('.response').css({'background' : 'rgba(189,9,22,0.7)', 'color' : '#ffffff'});						$.cookie('subscribed', 'not-yet', { expires: 7, path: '/' });					}				},				error: function(msg) {					$('.response').html(msg).css({'background' : 'rgba(255, 0, 0, 0.7)'});				}			});			return false;		});		// Close Button		$('.close-modal').click(function(){			$.cookie('notyet', 'not-yet', { path: '/' });		});		// Used to check if mobile or not according to specific mobile hidden elements		// DefaultValue		var mobile = false;		// General page load functionality		// Popup loads, slides open, pauses, slides shut, changes 'Join our mailing list' button to green bg		// Not-yet cookie is set, will only slide open once		if($.cookie('notyet') != 'not-yet'){			// I don't like this either			// Due to Google mobile popup rules, client requested only the mobile implementation of the popup to be changed.			// Informed client of a few different options, however they opted into this, while not pretty- at all, it achieves the goal at minimal cost.			// I'm sorry.			if($('.top-links').css('display') == 'none' && mobile == false) {				// This is set to use as a record to check against later				mobile = true;				// Manipulate element visibility in the dirtiest way we possibly can... check.				$('.top-links').css({'display' : 'block', 'width' : '100%', 'margin' : '2% 0'});				$('.header-envelope').css({'width' : 'inherit', 'margin' : '6% 0'});				$('.account-cart-wrapper a:first-child, .header-minicart', '.top-links').hide();				$('.email-sub').attr('rel', 'empty');				$('#mailchimp').show();				// Open and close button				$('#mailchimp').prepend('<a href="#" class="small-close" title="open/close">X</a>');				// Close and open functionality of modal when .modal() inactive				// Only on small mobile devices				$('.small-close').click(function() {					$('#mailchimp').slideUp();					return false;				});				// Open/close functionality of top-links envelope				$('.email-sub').click(function() {					if($('#mailchimp:visible').length > 0) {						$('#mailchimp').slideUp();					}else{						$('#mailchimp').slideDown();					}					return false;				});			}else{				$('#mailchimp').modal();			}			$.cookie('notyet', 'not-yet', { path: '/' });		}else{			// Otherwise make it green to draw attention			if($.cookie('subscribed')){				$('#mailchimp, .email-sub').hide();			}else{				$('#mailchimp').hide();			}		}		// Remove and replace default input text on focus/blur		$('#mailchimp-header input:not(.submit)').focus(function(){			if (this.defaultValue == this.value) this.value = '';		});		$('#mailchimp-header input:not(.submit)').blur(function(){			if (this.value == '') this.value = this.defaultValue;		});	});})(jQuery);