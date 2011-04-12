var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7383658-5']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script');
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
})();
$(document).ready( function() {
	//References
	var sections = $("#menu li");
	var loading = $("#loading");
	var content = $("#content");

	content.load("home.html");

	//Manage click events
	sections.click( function() {
		//show the loading bar
		//showLoading();
		//load selected section
		switch(this.id) {
			case "home":
				//content.slideUp();
				content.load("home.html", hideLoading);
				//content.slideDown();
				break;
			case "courses":
				//content.slideUp();
				content.load("courses.html", hideLoading);
				//content.slideDown();
				break;
			case "apply":
				//content.slideUp();
				content.load("apply.html", hideLoading);
				//content.slideDown();
				break;
			case "links":
				//content.slideUp();
				content.load("links.html", hideLoading);
				//content.slideDown();
				break;
			case "contact":
				//content.slideUp();
				content.load("contact.html", hideLoading);
				//content.slideDown();
				break;
			default:
				//hide loading bar if there is no selected section
				//hideLoading();
				break;
		}
	});
	$('#submit_button').click( function() {
		$.ajax({
			type: 'POST',
			url: 'email.php',
			data: $('form#myform').serialize(),
			dataType: 'json',
			beforeSend: function() {
				var name = $('#name').val();
				var address = $('#address').val();
				var postalcode = $('#postalcode').val();
				var city = $('#city').val();
				var phonenumber = $('#phonenumber').val();
				var email = $('#email').val();
				var age = $('#age').val();
				var course = $('#phonenumber').val();
				var message = $('#message').val();
				if (!name[0] || !address[0] || !postalcode[0] || !city[0] || !phonenumber[0]  || !email[0] || !age[0] || !course[0]) {
					$('#output').html('Alla fälten måste fyllas i!');
					return false;
				}
				emailpat = /^([a-z0-9])+([\.a-z0-9_-])*@([a-z0-9])+(\.[a-z0-9_-]+)+$/i;
				if (!emailpat.test(email)) {
					$('#output').html('Angiven epost adress har ett ogiltigt format');
					return false;
				}
			},
			success: function(response) {
				if (response.status == 'success') {
					$('#formcont').html();
				}
				$('#output').html(response.errmessage);
			}
		});
	});
	//show loading bar
	function showLoading() {
		loading
		.css({visibility:"visible"})
		.css({opacity:"1"})
		.css({display:"block"})
		;
	}

	//hide loading bar
	function hideLoading() {
		//loading.fadeTo(1000, 0);
	};

});     