
function MemoryManger() {
	
	return _LastMemoryLocation + 1;
	
}

//Assigns a memory slot to a loaded process
function assignMemorySlot(pcb) {
	var userProgram = document.getElementById("taProgramInput").value;
	var base = 0;
	var limit = 0;
	var tempString = userProgram.split(" ");
	
	if (pcb.pid === 0) {
		pcb.base = 0;
		pcb.limit = _MemoryBlock;
		
		//Places userProgram in physical memory location
		var i = pcb.base;
		var j = 0;
		var q = 0;
		while (i < _Memory.length) {
			if (q < tempString.length) {
				_Memory[i] = tempString[j];
			}
			
			else {
				_Memory[i] = "00";
			}
			i++;
			j++;
			q++;
		}
		
	}
	else if (pcb.pid === 1) {
		pcb.base = _MemoryBlock + 1;
		pcb.limit = (pcb.base + _MemoryBlock);
		
		//Places userProgram in physical memory location
		var i = pcb.base;
		var j = 0;
		var q = 0;
		while (i < _Memory.length) {
			if (q < tempString.length) {
				_Memory[i] = tempString[j];
			}
			
			else {
				_Memory[i] = "00";
			}
			i++;
			j++;
			q++;
		}
		
	}
	else if(pcb.pid === 2) {
		pcb.base = (2 * _MemoryBlock) + 1;
		pcb.limit = (pcb.base + _MemoryBlock);
		
		//Places userProgram in physical memory location
		var i = pcb.base;
		var j = 0;
		var q = 0;
		while (i < _Memory.length) {
			if (q < tempString.length) {
				_Memory[i] = tempString[j];
			}
			
			else {
				_Memory[i] = "00";
			}
			i++;
			j++;
			q++;
		}
		
	}

	return pcb; 
	
}

//****
function clearMemoryDisplay(pcb) {
				
		var base = pcb.base;
		var limit = pcb.limit;


		while (base <= limit) {
			document.getElementById("bit" + base).innerHTML="00";
			base++;
		}
		
}


//********
//Creates the memory display on the screen
function createMemoryDisplay() {

var table = document.createElement("table"), th, tr, td, text;
var bitNum = 0;
var y = 0;

th = document.createElement("th");
th.setAttribute('class', 'memTableHead');
text = document.createTextNode("Memory Table");
th.appendChild(text);

table.appendChild(th);

for (var i = 0; i < (_AllMemory+2)/8; i++) {

	tr = document.createElement('tr');
	for (var x = 0; x < 8; x++) {
		
		//First td will be a "header" for the row
		if (x === 0) {
			td = document.createElement('td');
			td.setAttribute('class', 'memTDHead');
	
			switch(true) {
				case (y < 9):
					text = document.createTextNode("$000" + y);
					break;
				case (y < 99):
					text = document.createTextNode("$00" + y);
					break;
				case (y < 999):
					text = document.createTextNode("$0" + y);
					break;
				default:
					text = document.createTextNode("$0" + y);
					break;
			}
			//text = document.createTextNode("$" + y);
			td.appendChild(text);
			tr.appendChild(td);
			y+=8; //8 memory elements per row
		}
	
		td = document.createElement('td');
		td.setAttribute('id','bit' + bitNum);
		td.setAttribute('class', 'memTD');
		text = document.createTextNode("00");
		
		td.appendChild(text);
		tr.appendChild(td);
		bitNum++;
	}
	
	table.appendChild(tr);
		  
}
	console.log(table);
	
	var parent = document.getElementById("memoryTable");
	parent.innerHTML="";
	parent.appendChild(table);
}
