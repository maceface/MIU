/* Dana Mace
MIU TERM 1302
Feb 11, 2013
main.js page*/

// Main Function Ensures DOM content is loaded and ready
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementByID function
    function whatever(x){
        var beHappy = document.getElementById(x);
        return beHappy;
    }
    
    function doGroup(){
        var doTag = document.getElementsByTagName("form");
            pickAList = whatever('colors');
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "happyColorGroups");
        for(var i=0, j=happyColorGroups.length; i<j; i++) {
            var doOpt = document.createElement('option');
            var doText = happyColorGroups[i];
            doOpt.setAttribute("value", doText);
            doOpt.innerHTML = doText;
            makeSelect.appendChild(doOpt);
        }
        pickAList.appendChild(makeSelect);
        
    }
    
    //Get Checkbox Value
    function getCheckboxValue(){
        var myCheckboxes = document.forms[0].items;
        var savedChecks = [];
        for (var i=0, j=myCheckboxes.length; i<j; i++){
            if(myCheckboxes[i].checked){
                var whatGotChecked = myCheckboxes[i].value;
                savedChecks.push(whatGotChecked);
            }
        }
        return savedChecks;
    }
    
        //Display Grat data on other page
    function controlThisToggle(n){
        switch(n){
            case "on":
                whatever('gratitudeForm').style.display = "none";
                whatever('clearGrat').style.display = "inline";
                whatever('displayGrat').style.display = "none";
                whatever('addNewGrat').style.display = "inline";
                break;
            case "off":
                whatever('gratitudeForm').style.display = "block";
                whatever('clearGrat').style.display = "inline";
                whatever('displayGrat').style.display = "inline";
                whatever('addNewGrat').style.display = "none";
                whatever('choices').style.display = "none";
                break;
            default:
                return false;
        }
    }
     
    //Store Grat in Local Storage
    function storeLocally(key){
        //If there is no key, this means this is a new item and you need a key
        if(!key){
            var id = Math.floor(Math.random()*123456789);
        }else{
            //otherwise, set the id to the existing key we're editing so that it will save over the data
            //The key is the same key that's been passed along from the editSubmit event handler
            //To the makeARequirement function and then passed here into the storeLocally function.
            id = key;
        }
        var display = getCheckboxValue();
        //Store form field values in an object
        //Objects props - array with form labels and input values
        var choice = {};
            choice.date = ["Date:", whatever('date').value];
            choice.time = ["Time:", whatever('time').value];
            
            choice.what = ["What I'm grateful for:", whatever('gratitude').value];
            
            choice.why = ["I have an attitude of gratitude because:", whatever('gratStory').value];
            
            choice.color = ["What color do you like best today?:", whatever('happyColorGroups').value];
            
            choice.items = ["Which items make you happy?", savedChecks];
            
            choice.scale = ["Rate your Attitude of Gratitude:", whatever('scaleIt').value];
            
    //Save data to local storage: conv returnsAccepted to a string
        localStorage.setItem(id, JSON.stringify(choice));
        alert("Gratitude Added!");
    }
        
    //Function to see local storage data
    function showMeWutchaGot (){
        controlThisToggle("on");
        if(localStorage.length === 0) {
            alert("There are no Gratitudes in your library, so default gratitudes will be added.");
            autoFillGrat ();
        }
        
        //From local to browser
        var hereToThere = document.createElement('div');
        hereToThere.setAttribute("id", "choices");
        var recordYourHeart = document.createElement('ul');
        hereToThere.appendChild(recordYourHeart);
        document.body.appendChild(hereToThere);
        whatever('choices').style.display = "block";
        for(var i=0, len=localStorage.length; i<len; i++) {
            var doList = document.createElement('li');
            var linksLi = document.createElement('li');
            recordYourHeart.appendChild(doList);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //Local storage back to object
            var returnsAccepted = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            doList.appendChild(makeSubList);
            getImage(returnsAccepted.color[1], makeSubList);
            for (var n in returnsAccepted) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = returnsAccepted[n][0] + " " + returnsAccepted[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            var breakTag = document.createElement('br');
            linksLi.appendChild(breakTag);
            
            doDeleteEditLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage
        
            var breakTag = document.createElement('br');
            linksLi.appendChild(breakTag);
        }
        hereToThere.style.margin = "0px 0px 8px 0px";
        recordYourHeart.style.fontsize = "10pt";
        recordYourHeart.style.margin = "8px 8px 0px 8px";
        recordYourHeart.style.padding = "8px 8px 12px";
        
    }
    
    //Get the image for the right category
    function getImage(likedColor, makeSubList){
        var images = document.createElement('li');
        makeSubList.appendChild(images);
        var colorIcon = document.createElement('img');
        var whichOne = colorIcon.setAttribute("src", "img/"+ likedColor + ".png");
        images.appendChild(colorIcon);
    }
    
    //Auto Populate Local Storage
    function autoFillGrat(){
        //The actual JSON OBJECT data required for this to work is coming from our JSON.js file which is loaded from our HTML page
        //Store the JSON OBJECT into Local Storage.
        for(var n in json){
            var id = Math.floor(Math.random()*123456789);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    
    //Make Item Links
    //Creat the edit and delete links for each stored item when displayed
    function doDeleteEditLinks(key, linksLi){
        //add edit single item link
        var fixerLink = document.createElement('a');
        fixerLink.href = "#";
        fixerLink.key = key;
        var editText = "Edit Journal";
        fixerLink.addEventListener("click", dontLikeItChangeIt);
        fixerLink.innerHTML = editText;
        linksLi.appendChild(fixerLink);
        
        //add line break
        var lineBreakTag = document.createElement('br');
        linksLi.appendChild(lineBreakTag);
        
        //add delete single item link
        var dumpItLink = document.createElement('a');
        dumpItLink.href = "#";
        dumpItLink.key = key;
        var deleteText = "Delete Gratitude";
        dumpItLink.addEventListener("click", byeByeItem);
        dumpItLink.innerHTML = deleteText;
        linksLi.appendChild(dumpItLink);
    }
    
    var dontLikeItChangeIt = function(){
        //Grab the data from our item from Local Storage.
        var myCheckboxes = document.forms[0].items;
        alert(myCheckboxes.length);
        var value = localStorage.getItem(this.key);
        var choice = JSON.parse(value);
        
        //show the form
        controlThisToggle("off");
        
        //populate the form fields with the current local storage values
        whatever('date').value = choice.date[1];
        whatever('time').value = choice.time[1];
        whatever('gratitude').value = choice.what[1];
        whatever('gratStory').value = choice.why[1];
        whatever('happyColorGroups').value = choice.color[1];
        
        items = choice.items[1].toString().split(',');
        alert(items);
        for(i=0; 1<myCheckboxes.length; i++){
            for(n=0; n<items.length; n++){
                if(myCheckboxes[i].value === items[n]){
                    alert("We have a match");
                    myCheckboxes[i].checked = true;
                }
            }
        }
        
        
        whatever('scaleIt').value = choice.scale[1];
        
        //Remove the initial listener from the input "save contact" button.
        saveGrat.removeEventListener("click", storeLocally);
        //Change Submit Button Value to say Edit Button
        whatever('saveGrat').value = "Edit Contact"
        var editSubmit = whatever('saveGrat');
        //Save the key value established in this funtion as a property of the editSubmit event
        //so we can use that value when we save the data we edited
        editSubmit.addEventListener("click", makeARequirement);
        editSubmit.key = this.key;
       
    }
    
    function byeByeItem(){
        var ask = confirm("Are you sure you want to delete this Gratitude");
        if(ask){
            localStorage.removeItem(this.key);
            alert("the selected Gratitude was deleted.");
            window.location.reload();
        }else{
            alert("the selected Gratitude was not deleted.");
        }
    }
    
    //Function - erase grats in local
    function getOffMyDevice(){
        if(localStorage.length === 0){
            alert("There are no gratitudes to delete.");
        }else{
            localStorage.clear();
            alert("All gratitudes have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    function makeARequirement(e){
        //Define the elements we want to check
        var getDate = whatever('date');
        var getGratitude = whatever('gratitude');
        
        //Reset the Error messages
        somethingIsSeriouslyWrongMsg.innerHTML = "";
        getDate.style.border = "1px solid black";
        getGratitude.style.border = "1px solid black";
        
        //Get error messages
        var findFormErrors = [];
        //Date Validation
        if(getDate.value===""){
            var dateError = "Please enter a Date.";
            getDate.style.border = "1px solid red";
            findFormErrors.push(dateError);
        }
        
        //Gratitude Validation
        if(getGratitude.value===""){
            var gratError = "Please enter a Gratitude.";
            getGratitude.style.border = "1px solid red";
            findFormErrors.push(gratError);
        }
        
        //If there were errors, display them on the screen
        if(findFormErrors.length >= 1){
            for(var i=0, j=findFormErrors.length; i<j; i++){
                var scribble = document.createElement('li');
                scribble.innerHTML = findFormErrors[i];
                somethingIsSeriouslyWrongMsg.appendChild(scribble);
            }
            e.preventDefault();
            return false;
        }else{
            //if all is OK, save our data! Send key value (which came from editData function).
            //Remember this key value was passed through the editSubmit event Listener
            storeLocally(this.key);
        }
        
    }
    
    //Variable defaults
    var happyColorGroups = ["--Colors--", "Yellow", "Pink", "Blue", "Green", "Red", "Orange"],
        whatGotChecked,
        savedChecks,
        dontLikeItChangeIt,
        somethingIsSeriouslyWrongMsg = whatever('errors');
        
    ;
    doGroup();
       
    //Set link and submit click events
    
    
    var displayGrat = whatever("displayGrat");
    displayGrat.addEventListener("click", showMeWutchaGot);
    var clearGrat = whatever("clearGrat");
    clearGrat.addEventListener("click", getOffMyDevice);
    var saveGrat = whatever("saveGrat");
    saveGrat.addEventListener("click", makeARequirement);
    
    
});