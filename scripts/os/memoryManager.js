
function MemoryManger() {
	
	return _LastMemoryLocation + 1;
	
}

//Assigns a memory slot to a loaded process
function assignMemorySlot(pcb) {
	
	var base = 0;
	var limit = 0;
	
	if (pcb.pid === 0) {
		pcb.base = 0;
		pcb.limit = _MemoryBlock;
	}
	else if (pcb.pid === 1) {
		pcb.base = _MemoryBlock + 1;
		pcb.limit = (pcb.base + _MemoryBlock);
	}
	else if(pcb.pid === 2) {
		pcb.base = (2 * _MemoryBlock) + 1;
		pcb.limit = (pcb.base + _MemoryBlock);
	}

	return pcb; 
	
}


