function Memory() 
{
	var memoryArray = new Array();
	
	for (var j = 0; j < 128; j++) {
		//memoryArray[j] = "00";
		document.getElementById("bit" + j).innerHTML="00";
	}
	
	return memoryArray;
}
