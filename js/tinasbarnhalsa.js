var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7383658-5']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function(){
    //References
    var sections = $("#menu li");
    var loading = $("#loading");
    var content = $("#content");
    
    //Manage click events
    sections.click(function(){
        //show the loading bar
        //showLoading();
        //load selected section
        switch(this.id){
            case "home":
                //content.slideUp();
                content.load("home.html", hideLoading);
                //content.slideDown();
                break;
            case "courses":
                //content.slideUp();
                content.load("cources.html", hideLoading);
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
    function showLoading(){
        loading
            .css({visibility:"visible"})
            .css({opacity:"1"})
            .css({display:"block"})
        ;
    }
    //hide loading bar
    function hideLoading(){
        //loading.fadeTo(1000, 0);
    };
});     