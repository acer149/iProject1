
function MemoryManger() {
	
	return _LastMemoryLocation + 1;
	
	
}

this.getOpcode = function() {
	return _Memory[0].pcb.programCounter;
	
};
