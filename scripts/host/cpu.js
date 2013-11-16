	/* ------------  
   CPU.js

   Requires global.js.
   
   Routines for the host CPU simulation, NOT for the OS itself.  
   In this manner, it's A LITTLE BIT like a hypervisor,
   in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
   that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
   JavaScript in both the host and client environments.

   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

function Cpu() {
    this.PC    = 0;     // Program Counter
    this.Acc   = 0;     // Accumulator
    this.Xreg  = 0;     // X register
    this.Yreg  = 0;     // Y register
    this.Zflag = 0;     // Z-ero flag (Think of it as "isZero".)
    this.isExecuting = false;
    
    this.init = function() {
        this.PC    = 0;
        this.Acc   = 0;
        this.Xreg  = 0;
        this.Yreg  = 0;
        this.Zflag = 0;      
        this.isExecuting = false;  
    };
        
    this.cycle = function() {
        krnTrace("CPU cycle");
        // TODO: Accumulate CPU usage and profiling statistics here.
        // Do the real work here. Be sure to set this.isExecuting appropriately.
        
        if (_RoundRobinActive) {
        	//if the ready queue is not empty perform a context switch
        	if (!(_ReadyQueue.isEmpty())) {
        		if(_CpuCycleCount >= RoundRobinQuantum) {
        			
        			//console.log("Quantum Switch");
        			storePCBState();
        		
        			performContextSwitch(); //Scheduler.js
        		}
        	}
        }
        
        var opcodeToRun = getOpcode();
        
        run(_CurrentProcess[opcodeToRun]);
        
        _CpuCycleCount++;
    };
    
}

	this.getOpcode = function() {
	//console.log("Prog Count = " + _CPU.PC);
	return _CPU.PC;
	
	};

    //opcodes
    //Will identify the user process's opcodes and call the associated function of that opcode
    this.run = function(opcode) {
    	switch(opcode) {
    		case "A9":
    			loadAccumulatorWithAConstant();
    			break;
    		case "AD":
    			loadAccumulatorFromMemory();
    			break;
    		case "8D":
    			storeAccumulatorInMemory();
    			break;
    		case "6D":
    			addWithCarry();
    			break;
    		case "A2":
    			loadXRegisterWithAConstant();
    			break;
    		case "AE":
    			loadXRegisterFromMmeory();
    			break;
    		case "A0":
    			loadYRegisterWithAConstant();
    			break;
    		case "AC":
    			loadYRegisterFromMemory();
    			break;
    		case "EA":
    			noOperation();
    			break;
    		case "00":
    			osBreak();
    			break;
    		case "EC":
    			compareXRegisterToMemoryByteAndSetZToZeroIfEqual();
    			break;
    		case "D0":
    			branchXBytesIfZEqualsZero();
    			break;
    		case "EE":
    			incrementByteValue();
    			break;
    		case "FF":
    			systemCall();
    			break;
    		default:
    			osBreak();
    			break;
    	}  	
    };


function loadAccumulatorWithAConstant() { //A9
	
	var parameterOfA9 = _CurrentProcess[_CPU.PC + 1];  
	var constantLoaded = parameterOfA9; //Decimal	
	_CPU.Acc = constantLoaded;
	_CPU.PC += 2;
	//console.log(_CPU.PC);
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=constantLoaded;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
} 

function loadAccumulatorFromMemory() { //AD
	
	var decimalLocationInMemoryFromWhichToLoadAccumulator = parseInt(_CurrentProcess[_CPU.PC + 1] , 16);
	
	_CPU.Acc = _CurrentProcess[decimalLocationInMemoryFromWhichToLoadAccumulator];
	
	_CPU.PC += 3;

	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function storeAccumulatorInMemory() { //8D	
	var hexMemLocationForAccToBeStored = _CurrentProcess[_CPU.PC + 1]; //Value in hex
	
	var decimalMemLocationForAccToBeStored = parseInt(hexMemLocationForAccToBeStored, 16);
	//console.log("Accumulator " + parseInt(_CPU.Acc, 16));
	_CurrentProcess[decimalMemLocationForAccToBeStored] = _CPU.Acc;
	
	//console.log("Storing Location dec" + decimalMemLocationForAccToBeStored);
	document.getElementById("bit" + (decimalMemLocationForAccToBeStored + _CurrentProcessPCB.base)).innerHTML=_CPU.Acc;
	
	
	//console.log("Acc to be stored " + _CPU.Acc);
	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function addWithCarry() { //6D

	//console.log(" " + _Memory[_CPU.PC + 1]);
	_CPU.Acc = parseInt(_CPU.Acc, 16) + parseInt(_CurrentProcess[parseInt(_CurrentProcess[_CPU.PC + 1], 16)], 16); //Decimal	 //Check this******
	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadXRegisterWithAConstant() { //A2
	
	var parameterOfA2 = _CurrentProcess[_CPU.PC + 1];
	var constant = parseInt(parameterOfA2, 16); //Decimal
	
	_CPU.Xreg = constant;

	_CPU.PC += 2;

	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadXRegisterFromMmeory() { //AE
	
	_CPU.Xreg = _CurrentProcess[parseInt(_Memory[_CPU.PC + 1], 16)];

	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function loadYRegisterWithAConstant() { //A0
	
	var parameterOfA0 = _CurrentProcess[_CPU.PC + 1];
	var memLocation = parseInt(parameterOfA0, 16); //Decimal
	
	//This will be the starting memory location of the string (in decimal)
	_CPU.Yreg = memLocation;
	
	_CPU.PC += 2;

	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadYRegisterFromMemory() { //AC	
	
	_CPU.Yreg = _CurrentProcess[parseInt(_CurrentProcess[_CPU.PC + 1], 16)]; //****************

	//console.log("YReg " + _CPU.Yreg);
	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function noOperation() { //EA
	_CPU.PC += 1;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function osBreak() { //00

	//_CPU.PC += 1;
	//_CPU.isExecuting = false;
	//_CPU.PC = 0; //Reset the PC	
	
	if (_RoundRobinActive) {
		_CurrentProcessPCB.processState = "Ended";
		document.getElementById("state").innerHTML=_CurrentProcessPCB.processState;
	}
	
	console.log("Reached osBreak");
	if (_ReadyQueue.isEmpty()) {
		
		console.log("Ready Queue is empty");
		_CPU.isExecuting = false;
		_LastPid = -1;
		_CPU.PC = 0; //Reset the PC
		console.log("RESIDENTLIST " + _ResidentList);
		clearMemoryDisplay(_CurrentProcessPCB);
	}
	else {
		
		if(_RoundRobinActive) {
			performContextSwitch();
		}
		else {
			_CPU.PC = 0; //Reset the PC
			executeTheReadyQueue();
		}
	}
	
	
}

function compareXRegisterToMemoryByteAndSetZToZeroIfEqual() { //EC
	
	var operand = _CurrentProcess[_CPU.PC + 1];
	
	var decimalMemLocation = parseInt(operand, 16);
	//console.log("Compare value from mem @ " + decimalMemLocation + " which is " + parseInt(_Memory[decimalMemLocation]));
	//console.log("XREG " + _CPU.Xreg);
	
	
	if (parseInt(_CPU.Xreg, 16) === parseInt(_CurrentProcess[decimalMemLocation], 16)) { //****Remove parseInt 16?

		_CPU.Zflag = 1;
	}
	else {
		_CPU.Zflag = 0;
	}

	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function branchXBytesIfZEqualsZero() { //D0
	if (_CPU.Zflag === 0) {
		
		//console.log("Branch Value = " + parseInt(_Memory[_CPU.PC + 1], 16));
		_CPU.PC += (parseInt(_CurrentProcess[_CPU.PC + 1], 16) + 2); //Decimal
		
		//console.log("zflag was 0");
		
		if (_CPU.PC > 255) {
			_CPU.PC -= 256;
			//console.log("pc " + _CPU.PC); //PC that is branched back to
		}
		
	}
	else {
		_CPU.PC += 2;
		//console.log("PC After loop is finished =" + _CPU.PC);
	}
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function incrementByteValue() { //EE
	
	var memLocation = parseInt(_CurrentProcess[_CPU.PC + 1], 16); //Decimal
	var valueAtMemLocation = parseInt(_CurrentProcess[memLocation], 16); //Decimal
	
	_CurrentProcess[memLocation] = valueAtMemLocation + 1; 
	
	document.getElementById("bit" + (memLocation + _CurrentProcessPCB.base)).innerHTML=valueAtMemLocation + 1;
	
	
	_CPU.PC += 3;
	
	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function systemCall() { //FF	

	if (_CPU.Xreg === 1) {
		//console.log("Yreg " + parseInt(_CPU.Yreg) );
		var printToConsole = parseInt(_CPU.Yreg).toString();

		for (var i = 0; i < printToConsole.length; i++) {
			_StdIn.putText(printToConsole.charAt(i));		
		}
		//console.log("Reached sysCall");

		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	}
	
	else if (_CPU.Xreg === 2) {
	
		var startingMemoryLocationOfProgramString = _CPU.Yreg; //Decimal
		
		//console.log("First char code " + _Memory[startingMemoryLocationOfProgramString]);
		
		while(_CurrentProcess[startingMemoryLocationOfProgramString] != "00") {
			
			var letterCode = _CurrentProcess[startingMemoryLocationOfProgramString];
			var letter = String.fromCharCode(parseInt(letterCode, 16));
			
			_StdIn.putText(letter); 
			startingMemoryLocationOfProgramString++;
		}
		
		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	}
	else {
		//_CPU.isExecuting = false;
		//console.log("_CPU.Xreg = " + _CPU.Xreg);
	}

	
	_CPU.PC += 1;

	document.getElementById("pid").innerHTML=_CurrentProcessPCB.pid;
	document.getElementById("accumulator").innerHTML=_CPU.Acc;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_CPU.Xreg;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}


function storePCBState() {
	
	console.log("Storing process with pid: " + _CurrentProcessPCB.pid
										+ " Program Counter: " + _CPU.PC
										+ " Accumulator: " + _CPU.Acc
										+ " Xregister: " + _CPU.Xreg
										+ " Yregister: " + _CPU.Yreg
										+ " Zflag: " + _CPU.Zflag + "\n");
							
	
		//**
		var currentProcess = _CurrentProcessPCB;
		var base = parseInt(currentProcess.base);
		var limit = parseInt(currentProcess.limit);
		var i = 0;
			
		while (base <= limit) {
			_Memory[base] = _CurrentProcess[i];
			
			i++;
			base++;
		}
	
		//**
	
	_CurrentProcessPCB.programCounter = _CPU.PC;
	_CurrentProcessPCB.accumulator = _CPU.Acc; 
	_CurrentProcessPCB.xRegister = _CPU.Xreg;
	_CurrentProcessPCB.yRegister = _CPU.Yreg;
	_CurrentProcessPCB.zFlag = _CPU.Zflag;
	
	//performContextSwitch();
	
}


















