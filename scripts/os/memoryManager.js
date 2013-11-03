
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
		while (i < _OpcodeArray.length) {
			if (q < tempString.length) {
				_OpcodeArray[i] = tempString[j];
			}
			
			else {
				_OpcodeArray[i] = "00";
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
		while (i < _OpcodeArray.length) {
			if (q < tempString.length) {
				_OpcodeArray[i] = tempString[j];
			}
			
			else {
				_OpcodeArray[i] = "00";
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
		while (i < _OpcodeArray.length) {
			if (q < tempString.length) {
				_OpcodeArray[i] = tempString[j];
			}
			
			else {
				_OpcodeArray[i] = "00";
			}
			i++;
			j++;
			q++;
		}
		
	}

	return pcb; 
	
}


		//Splits the user program on spaces and adds it to the _OpcodeArray
		//var i = pcb.base;
		// var j = 0;
		// console.log("Here " + i);
		// var tempString = userProgram.split(" ");
// 		
		// while (i < _OpcodeArray.length) {
			// if (i < tempString.length) {
				// _OpcodeArray[i] = tempString[j];
			// }
// 			
			// else {
				// _OpcodeArray[i] = "00";
			// }
			// i++;
			// j++;
		// }

