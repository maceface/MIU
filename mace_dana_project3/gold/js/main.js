//$('#gohome').on('pageinit', function(){
	//code needed for home page goes here
//});	

$('#addItem').on('pageinit', function(){
    
                $("reset").click(clearLocal)
                
                $("#lookAtGrats").click(getData);
                

		var aG = $('#addGratForm');
                        gratErrorsLink = $('#addGratErrorsLink');
		    aG.validate({
			invalidHandler: function(form, validator) {
                            gratErrorsLink.click();
                            var html = '';
                            for(var key in validator.submitted){
                                var label = $('label[for^="'+ key + '"]')
                                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
 				var fieldName = legend.length ? legend.text() : label.text();
 				html += '<li>' + fieldName + '</li>';
                            }
                            $("#addGratErrors ul").html(html);
			},
                        submitHandler: function() {
                        var data = aG.serializeArray();
			storeData(data);
                    }
                });
	
	//any other code needed for addItem page goes here
	
});

$('#lookAtLocalStorage').on('pageinit', function(){
        getData();
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillData = function (){
	for(var n in json){
            var id = Math.floor(Math.random()*123456789);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
};

var makeItemLinks = function (key, linksli) {

	// add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete This Gratitude";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksli.appendChild(deleteLink);
};

var getData = function(){
    if(localStorage.length === 0){
		alert("No Gratitudes found in Local Storage. Default Gratitudes will be added");
		autoFillData();
    }
    //from local to browser
    var makeList = document.createElement("ul");
    $('#lookAtLocalStorage').append(makeList);
    for(var i=0, len=localStorage.length; i<len;i++){
	var makeli = document.createElement("li");
	var linksli = document.createElement("li");
	makeList.appendChild(makeli);
	var key = localStorage.key(i);
	var value = localStorage.getItem(key);
	    // From local storage back to an object using JSON.parse().
	var obj = JSON.parse(value);
	var makeSubList = document.createElement("ul");
	makeli.appendChild(makeSubList);
	for(var n in obj){
	    var makeSubli = document.createElement("li");
	    makeSubList.appendChild(makeSubli);
	    var optSubText = obj[n][0]+" "+obj[n][1];
	    makeSubli.innerHTML = optSubText;
	    makeSubList.appendChild(linksli);
	}
            //this creates edit/delete for individual grats in local storage...
	makeItemLinks(localStorage.key(i), linksli);
    }
};

var storeData = function(data, key){
    	if(!key){
		var id = Math.floor(Math.random()*123456789);
	}else{
		id = key;
	}
	var choice 	        = {};
		choice.date     = ["Date: ", $("#formDate").val()];
		choice.time     = ["Time: ", $("#formTime").val()];
		choice.what     = ["What I'm grateful for: ", $("#gratWhat").val()];
		choice.why      = ["I have an attitude of gratitude because: ", $("#gratWhy").val()];
		choice.color    = ["What color do you like best today?: ", $("#favcolor").val()];
		choice.items    = ["Which items make you happy?: ", $("input:checkbox[name=items]:checked").val()];
                choice.scale    = ["Rate your Attitude of Gratitude: ", $("#gratRate").val()];
	// Save data into local Storge; Use Stringify to convert our object to a string
	localStorage.setItem(id, JSON.stringify(choice));
	alert("Gratitude Saved!");
}; 

var deleteItem = function (){
    var itsGonnaGoAway = confirm(" Are you sure you wnat to delete this Gratitude?");
    if(itsGonnaGoAway){
	localStorage.removeItem(this.key);
	alert("Gratitude deleted!");
	window.location.reload();
    }else{
	alert("Your Gratitude was not deleted!");
    }		
};

var clearLocal = function(){
    if(localStorage.length === 0){
        alert("There are no recorded Gratitudes to clear.");
    }else{
        localStorage.clear();
        alert("All Gratitudes have been deleted.");
        window.location.reload();
        return false;
    }
};