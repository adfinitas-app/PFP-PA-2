$(document).foundation();


<!-- Début de la lib -->
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(data) {
  var url = 'https://form-to-db.herokuapp.com/';
  //var url = 'http://localhost:3000/';
  var body = JSON.stringify(data);

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  xhr.setRequestHeader('Content-Type', 'application/json');

  // Response handlers.
  xhr.onload = function() {
  };

  // Error Handler
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send(body);
}

function scrollToEl(el) {
	$('html, body').animate({
		scrollTop: $(el).offset().top 
	});
}

function plusBlancShow(el) {
	$('#' + el).addClass('block-hidden-visible').bind('mouseout', function() {
		$(this).removeClass('block-hidden-visible');
		$(this).parent().find('.block-legend').css('display', 'block');
	});
	$('#' + el).parent().find('.block-legend').css('display', 'none');
}

function showExamples() {
	$('#examples').show();
	$('#close_examples').show();
	$('#link_examples').hide();
}

function closeExamples() {
	$('#examples').hide();
	$('#close_examples').hide();
	$('#link_examples').show();
}

function sendForm() {
    woopra.track('interaction', {mot : document.getElementById('textarea').value, category:'CTA-PM',action:'clic',url:document.location.href,title: document.title });
  var data = {
    "schema": "pfp-mot",
    "db": {
      "mot": document.getElementById('textarea').value,
    }
  }
  makeCorsRequest(data);
	$('.errors').html('').css('display', 'none');
	var errors = false;
	
	if($('.textarea').val() == '') {
		$('.errors').html($('.errors').html() + 'Veuillez rédiger votre message<br />').css('display', 'block');
		errors = true;
	}
	if($('.checkbox').is(':checked') && $('.input').val() == '') {
		$('.errors').html($('.errors').html() + 'Veuillez renseigner votre téléphone<br />').css('display', 'block');
		errors = true;
	}
	
	var tel = $('.input').val();
	var chiffres = new String(tel);
	chiffres = chiffres.replace(/[^0-9]/g, '');
	compteur = chiffres.length;
	if($('.checkbox').is(':checked') && chiffres.length != 10) {
		$('.errors').html($('.errors').html() + 'Veuillez vérifier votre téléphone<br />').css('display', 'block');
		errors = true;
	}

	if(!errors) {
	    $( "#submition" ).submit();
		$('.errors').html('Votre message a bien été envoyé.').css('display', 'block');
		$('.textarea').val('');
		$('.input').val('');
		$('.checkbox').prop('checked', false);
		$('.select').val(1);
	}
}

$(function(){
	$('.img-hover').each(function() {
		$(this).bind('mouseover', function() {
			$('.top-img-hover').css('display', 'none');
			$(this).parent().find('.top-img-hover').css('display', 'block');
		});
		$('.top-img-hover', $(this).parent()).bind('mouseout', function() {
			$(this).css('display', 'none');
		});
	});
	
	$(window).resize(function() {
		if(screen.width <= 1024) {
			$('.block-plus').each(function() {
				$(this).unbind('click');
				$(this).unbind('mouseover');
				$('#' + $(this).parent().data('plus')).unbind('mouseout');
				$(this).bind('click', function() {
					var that = this;
					$('.block-details').each(function() {
						if($(this).parent().data('plus') != $(that).data('plus')) {
							$(this).css('display', 'none');
						}
					});
					if($('#' + $(this).data('plus')).css('display') != 'block') {
						$('#' + $(this).data('plus')).css('display', 'block');
					}
					else {
						$('#' + $(this).data('plus')).css('display', 'none');
					}
				});
			});
		
			$('.block-visible').unbind('mouseover');
			$('.block-visible').bind('click', function() {
				$('.block-hidden-visible').each(function() {
					$(this).removeClass('block-hidden-visible');
				});
				var block = $(this).find('.block-hidden');
				block.addClass('block-hidden-visible');
			});
		}
		else {
			$('.block-plus').each(function() {
				$(this).unbind('click');
				$(this).unbind('mouseover');
				$(this).bind('mouseover', function() {
					plusBlancShow($(this).data('plus'));
				});
			});
			
			$('.block-details').removeAttr('style');
		
			$('.block-visible').bind('mouseover', function() {
				var block = $(this).find('.block-hidden');
				block.addClass('block-hidden-visible').bind('mouseout', function() {
					$(this).removeClass('block-hidden-visible').unbind('mouseout');
				});
			});
		}
	});
	
	if(screen.width <= 1024) {
		$('.block-plus').each(function() {
			$(this).unbind('mouseover');
			$(this).bind('click', function() {
				var that = this;
				$('.block-details').each(function() {
					if($(this).parent().data('plus') != $(that).data('plus')) {
						$(this).css('display', 'none');
					}
				});
				if($('#' + $(this).data('plus')).css('display') != 'block') {
					$('#' + $(this).data('plus')).css('display', 'block');
				}
				else {
					$('#' + $(this).data('plus')).css('display', 'none');
				}
			});
		});
		
		$('.block-visible').unbind('mouseover');
		$('.block-visible').bind('click', function() {
			$('.block-hidden-visible').each(function() {
				$(this).removeClass('block-hidden-visible');
			});
			var block = $(this).find('.block-hidden');
			block.addClass('block-hidden-visible');
		});
	}
	else {
		$('.block-plus').each(function() {
			$(this).unbind('click');
			$(this).bind('mouseover', function() {
				plusBlancShow($(this).data('plus'));
			});
		});
		
		$('.block-visible').bind('mouseover', function() {
			var block = $(this).find('.block-hidden');
			block.addClass('block-hidden-visible').bind('mouseout', function() {
				$(this).removeClass('block-hidden-visible').unbind('mouseout');
			});
		});
	}
	
    var item_width = $('#slides li').outerWidth(); 
    var left_value = 0; 
	
	$('#slides li:first').before($('#slides li:last'));

    $('#slides ul').css({'left' : left_value});
	
    $('#prev').click(function() {
        var left_indent = parseInt($('#slides ul').css('left')) + item_width;
        $('#slides ul').animate({'left' : left_indent}, 200,function(){    
            $('#slides li:first').before($('#slides li:last'));           
            $('#slides ul').css({'left' : left_value});
        });

		return false;
    });

	$('#next').click(function() {
        var left_indent = parseInt($('#slides ul').css('left')) - item_width;
        $('#slides ul').animate({'left' : left_indent}, 200, function () {
            $('#slides li:last').after($('#slides li:first'));                     
            $('#slides ul').css({'left' : left_value});
        });

		return false;
    });        
});