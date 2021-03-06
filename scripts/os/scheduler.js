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
			_CurrentProcess[i] = _Memory[base];

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
			_CurrentProcessPCB.processState = "Ready";
			_ReadyQueue.enqueue(_CurrentProcessPCB);	
		}
		else if (_CurrentProcessPCB.processState === "Ended") {
			clearMemoryDisplay(_CurrentProcessPCB);
		}
	
	}
	else if (_ReadyQueue.isEmpty()) {
		_CPU.isExecuting = false;
		LastPid = -1;
		_CPU.PC = 0; //Reset the PC
		_RoundRobinActive = false;
		clearMemoryDisplay(_CurrentProcessPCB);
	}
	
	if (_RoundRobinActive) {
	_CurrentProcessPCB = _ReadyQueue.dequeue();
	
	//Set current process state to 'running'
	_CurrentProcessPCB.processState = "Running";
	document.getElementById("state").innerHTML=_CurrentProcessPCB.processState;
	
	
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
}
