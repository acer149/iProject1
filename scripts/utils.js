/* --------  
   Utils.js

   Utility functions.
   -------- */

function trim(str) {     // Use a regular expression to remove leading and trailing spaces.
	return str.replace(/^\s+ | \s+$/g, "");
	/* 
	Huh?  Take a breath.  Here we go:
	- The "|" separates this into two expressions, as in A or B.
	- "^\s+" matches a sequence of one or more whitespace characters at the beginning of a string.
    - "\s+$" is the same thing, but at the end of the string.
    - "g" makes is global, so we get all the whitespace.
    - "" is nothing, which is what we replace the whitespace with.
	*/
	
}

function rot13(str) {   // An easy-to understand implementation of the famous and common Rot13 obfuscator.
                        // You can do this in three lines with a complex regular expression, but I'd have
    var retVal = "";    // trouble explaining it in the future.  There's a lot to be said for obvious code.
    for (var i in str) {
        var ch = str[i];
        var code = 0;
        if ("abcedfghijklmABCDEFGHIJKLM".indexOf(ch) >= 0) {
            code = str.charCodeAt(i) + 13;  // It's okay to use 13.  It's not a magic number, it's called rot13.
            retVal = retVal + String.fromCharCode(code);
        } else if ("nopqrstuvwxyzNOPQRSTUVWXYZ".indexOf(ch) >= 0) {
            code = str.charCodeAt(i) - 13;  // It's okay to use 13.  See above.
            retVal = retVal + String.fromCharCode(code);
        } else {
            retVal = retVal + ch;
        }
    }
    return retVal;
}

//Utility to update the Ready Queue Display
function updateReadyQueueTable() {
	var numOfProcessesInRQ = _ReadyQueue.getSize();
	//console.log("HERE" + _ReadyQueue.getSize());
	var processToDisplay = null;
	
	clearReadyQueueDisplay();
	
	for (var i = 0; i < numOfProcessesInRQ; i++) {
		processToDisplay = _ReadyQueue.getQueuedItem(i);
		
		if (i === 0) {
			document.getElementById("RQpid" + (i+1)).innerHTML=processToDisplay.pid;
			document.getElementById("RQstate" + (i+1)).innerHTML=processToDisplay.processState;
			document.getElementById("RQpc" + (i+1)).innerHTML=processToDisplay.programCounter;
			document.getElementById("RQbase" + (i+1)).innerHTML=processToDisplay.base;
			document.getElementById("RQlimit" + (i+1)).innerHTML=processToDisplay.limit;	
		}
		else if (i === 1) {
			document.getElementById("RQpid" + (i+1)).innerHTML=processToDisplay.pid;
			document.getElementById("RQstate" + (i+1)).innerHTML=processToDisplay.processState;
			document.getElementById("RQpc" + (i+1)).innerHTML=processToDisplay.programCounter;
			document.getElementById("RQbase" + (i+1)).innerHTML=processToDisplay.base;
			document.getElementById("RQlimit" + (i+1)).innerHTML=processToDisplay.limit;			
		}

	}
}

//Utility to clear the Ready Queue Display
function clearReadyQueueDisplay() {
	for (var i = 0; i < 3; i++) {
		if (i === 0) {
			document.getElementById("RQpid" + (i+1)).innerHTML="";
			document.getElementById("RQstate" + (i+1)).innerHTML="";
			document.getElementById("RQpc" + (i+1)).innerHTML="";
			document.getElementById("RQbase" + (i+1)).innerHTML="";
			document.getElementById("RQlimit" + (i+1)).innerHTML="";	
		}
		else if (i === 1) {
			document.getElementById("RQpid" + (i+1)).innerHTML="";
			document.getElementById("RQstate" + (i+1)).innerHTML="";
			document.getElementById("RQpc" + (i+1)).innerHTML="";
			document.getElementById("RQbase" + (i+1)).innerHTML="";
			document.getElementById("RQlimit" + (i+1)).innerHTML="";			
		}	
	}
}


//Creates the file system display on the screen
function createFileSystemDisplay() {

var table = document.createElement("table"), th, tr, td, text;

th = document.createElement("th");
th.setAttribute('colspan', '9');
text = document.createTextNode("File System");
th.appendChild(text);

table.appendChild(th);

for (var i = 0; i < (_AllMemory+2)/8; i++) {

	tr = document.createElement('tr');
	for (var x = 0; x < 1; x++) {
		
		//First td will be a "header" for the row
		if (x === 0) {
			td = document.createElement('td');
			td.setAttribute('class', 'fsTDHead');
	
				for(var track = 0; track <= 3; track++) {
					for(var sector = 0; sector <= 7; sector++) {
						for(var block = 0; block <= 7; block++) {
				
							text = document.createTextNode("["+ track +"," + sector + "," + block + "]");
						}			
					}
				}

			td.appendChild(text);
			tr.appendChild(td);
		}
						
		td = document.createElement('td');
		td.setAttribute('id','tsb' + text);
		td.setAttribute('class', 'fsTD');
		text = document.createTextNode("0,~,~,~,\"~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~,~\"");
		
		td.appendChild(text);
		tr.appendChild(td);
		
	}
	
	table.appendChild(tr);
		  
}
	//console.log(table);
	
	var parent = document.getElementById("fileSystemTable");
	parent.innerHTML="";
	parent.appendChild(table);
}
