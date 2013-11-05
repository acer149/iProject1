/* ------------
   Scheduler.js

   Round Robin and Context Switching
   ------------ */
  

function executeTheReadyQueue() {
		var currentProcess = _ReadyQueue.dequeue();
		console.log("Ready Queue = " + _ReadyQueue);
		var base = parseInt(currentProcess.base);
		var limit = parseInt(currentProcess.limit);
		var i = 0;
			
		while (base <= limit) {
			_CurrentProcess[i] = _OpcodeArray[base];

			i++;
			base++;
		}
		
		_CPU.isExecuting = true;
	
}