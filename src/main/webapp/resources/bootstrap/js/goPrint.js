function printFrame(id)
{
	console.info("v1 DEBUG(id)", id);
	var frame = document.getElementById(id).contentWindow;
	$(".modal").modal("hide");
	printMode = true;
	frame.focus();
	frame.onfocus = function() {
			if(printMode)
			{
				frame.print();
				printMode = false;
			}
		};
}