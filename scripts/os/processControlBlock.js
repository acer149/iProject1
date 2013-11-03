function ProcessControlBlock(pid) {
	
	//Process ID
	this.pid = pid;	
	this.processState = null;
	this.programCounter = 0;
	this.accumulator = 0;
	this.base = 0;
	this.limit = _MemoryBlock;
	this.xRegister = 0;
	this.yRegister = 0;
	this.zFlag = 0;

}
