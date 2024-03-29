function setCookie(cname, exdays, goodBadCount){ //either sets or updates cookie and assigns new expiration date 24 hours from creation
	var user = getCookie(cname);                 //using textvalue as a parameter, checks for existence/if exists returns array with counter values
	var d = new Date();							 //creation of new date variable
	d.setTime(d.getTime() + (exdays*24*60*60*1000));			//sets time to 24 hours from now
	var expires = "expires=" + d;					     		//creates expiration date string to append to cookie
	if (user[0] === ""){											//if submitted textname does not exist in cookie form then...
		if (goodBadCount === 0){									//if "good" was selected,  create a cookie with textname and necessary good bad values
			document.cookie = cname+"=GOOD:1_BAD:0; "+expires;
		}
		else if (goodBadCount === 1){							//if "bad" was selected, create a cookie with textname and necessary good bad/values
			document.cookie = cname+"=GOOD:0_BAD:1; "+expires;
		}
	}
	else{						//if submitted textname was found in cookie form, delete old cookie and recreate with new incremented values
		document.cookie = cname+"=GOOD:"+(user[1])+"_BAD:"+(user[2])+"; expires=Thu, 01 Jan 1970 00:00:00 UTC";		//delete old text name cookie
		if(goodBadCount === 0){			//if "good" was selected, create new cookie with "good" incremented by one
			document.cookie = cname+"=GOOD:"+(parseInt(user[1])+1)+"_BAD:"+(user[2])+"; "+expires;
		}
		else if (goodBadCount === 1){	//if "bad" was selected, create new cookie with "bad" incremented by one
			document.cookie = cname+"=GOOD:"+(user[1])+"_BAD:"+(parseInt(user[2])+1)+"; "+expires;
		}
		
	}
}

function getCookie(cname){	//function checks for text name in current cookie, either returns null array, or array with cnamed cookie values
	var name = cname + "=";	//formatting the input name with the addition of an equals sign
	var returnArray = ["", 999, 999, ""];				//declaring and initializing data array to dummy values
	var ca = document.cookie.split(';');				//splitting cookie and assigning pieces to array
	for(var i=0; i<ca.length; i++){						//iterating through array to compare all strings to input
		var c = ca[i];									//assigning this iteration's element to a variable
		while (c.charAt(0)==' '){ 
			c = c.substring(1);							//removing space in front of string if one exists
		}
		
		if (c.indexOf(cname) > -1){						//if textname is located in current array index then...
			returnArray[0] = c.substring(0, name.length-1);					//assign name to returnArray[0]
			returnArray[1] = c.substring(name.length+5, name.length+6);		//assign "good" counter value to returnArray[1]
			returnArray[2] = c.substring(name.length+11, name.length+12);	//assign "bad" counter value to returnArray[2]
			returnArray[3] = c + ";";										//assign whole named cookie to returnArray[3] for later printing
			return returnArray;												//return substring values in array
		}
	}
	return ["", "", "", ""];							//if named array was not found, return an array of empty strings
}

function retrieveCookie(){				//function retrieves cookie and prints the full cookie
	var textVar = document.getElementById("textInput");	//get textbox ID location
	var user = textVar.value;							//assign textbox value to variable
	user = getCookie(user);								//send textbox value to getCookie() function to get named cookie value back
	if (user !== ""){									//if returned value exists and has values then...
	alert("Full Cookie: " + user[3]);					//print full named cookie
	}
}

function updateCookie(){									//collects information to send to create/update cookie, then displays new counts
		var textVar = document.getElementById("textInput");	//getting element ID location
		var user = textVar.value;							//getting value from textbox
		var radioCheck;										//declaring radiocheck variable to keep track of good/bad selection for param passing
		if (document.getElementById('r1').checked){			//if "good" is checked, set radioCheck variable to 0 for param passing
			radioCheck = 0;
		}
		else if (document.getElementById('r2').checked){	//if "bad is checked, set radioCheck variable to 1 for param passing
			radioCheck = 1;
		}
		if(user !== ""&& user !== null) {						//if data exists in the textbox, then pass parameters to setCookie() function
			setCookie(user, 1, radioCheck);
		}
		var newScores = getCookie(user);					//gets cookie information from getCookie() function
		alert("UserName: " + newScores[0] + " GoodCount: " + newScores[1] + " BadCount: " + newScores[2]); //prints current Good/bad count
		
	
}