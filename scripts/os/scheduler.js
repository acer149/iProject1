/* ------------
   Scheduler.js

   Round Robin and Context Switching
   ------------ */
  

function executeTheReadyQueue() {
		var currentProcess = _CurrentProcessPCB;//_ReadyQueue.dequeue();
		//console.log("Ready Queue = " + _ReadyQueue);
		var base = parseInt(currentProcess.base);
		var limit = parseInt(currentProcess.limit);
		var i = 0;
			
		//Pulls the process out if memory and loads it into an array
		//TODO:Access memory directly?
		while (base <= limit) {
			_CurrentProcess[i] = _OpcodeArray[base];

			i++;
			base++;
		}
		
		_CPU.isExecuting = true;
	
}

function performContextSwitch() {
	//Checks if there are processes in the ready queue
	if (!(_ReadyQueue.isEmpty())) {
		
		hostLog("Context Switch", "OS");
		
		console.log("CONTEXT SWITCH");
		
		//If the process has ended "00" do not add its PCB back onto the ready queue
		if(_CurrentProcessPCB.processState != "Ended") {
			_ReadyQueue.enqueue(_CurrentProcessPCB);	
		}
	
	}
	
	_CurrentProcessPCB = _ReadyQueue.dequeue();
	
	
			console.log("Loading process with pid: " + _CurrentProcessPCB.pid
										+ " Program Counter: " + _CurrentProcessPCB.programCounter
										+ " Accumulator: " + _CurrentProcessPCB.accumulator
										+ " Xregister: " + _CurrentProcessPCB.xRegister
										+ " Yregister: " + _CurrentProcessPCB.yRegister
										+ " Zflag: " + _CurrentProcessPCB.zFlag + "\n");
	
	
	
	//Update the _CPU with the current PCB values
	_CPU.PC = _CurrentProcessPCB.programCounter;
	_CPU.Acc = _CurrentProcessPCB.accumulator; 
	_CPU.Xreg = _CurrentProcessPCB.xRegister;
	_CPU.Yreg = _CurrentProcessPCB.yRegister;
	_CPU.Zflag = _CurrentProcessPCB.zFlag;
	
	updateReadyQueueTable();
	_CpuCycleCount = 1;
	executeTheReadyQueue();
}
