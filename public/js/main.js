
$(document).ready(function(){
	//collapsible menu in left panel
	$(".collapsible").on("click",function () {
		$(this).siblings(".options").slideToggle("height");
	});
});

