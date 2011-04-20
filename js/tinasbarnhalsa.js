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

	$("#sendmail").click(function(){
		var valid = '';
		var isr = ' is required.';
		var name = $("#name").val();
		var mail = $("#email").val();
		var subject = $("#name").val();
		var text = $("#message").val();
		if (name.length<1) {
			valid += '<br />Name'+isr;
		}
		if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
			valid += '<br />A valid Email'+isr;
		}
		if (subject.length<1) {
			valid += '<br />Subject'+isr;
		}
		if (text.length<1) {
			valid += '<br />Text'+isr;
		}
		if (valid!='') {
			$("#response").fadeIn("slow");
			$("#response").html("Error:"+valid);
		}
		else {
			var datastr ='name=' + name + '&mail=' + mail + '&subject=' + subject + '&text=' + text;
			$("#response").css("display", "block");
			$("#response").html("Sending message .... ");
			$("#response").fadeIn("slow");
			setTimeout("send('"+datastr+"')",2000);
		}
		return false;
	});


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

function send(datastr){
	$.ajax({	
		type: "POST",
		url: "email.php",
		data: datastr,
		cache: false,
		success: function(html){
		$("#response").fadeIn("slow");
		$("#response").html(html);
		setTimeout('$("#response").fadeOut("slow")',2000);
	}
	});
}
 