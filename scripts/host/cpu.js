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
        
        var opcodeToRun = getOpcode();
        
        run(_OpcodeArray[opcodeToRun]);
        //console.log("OpCode to run" + _OpcodeArray[opcodeToRun]);
    };
    
}

	this.getOpcode = function() {
	return _CPU.PC;
	
	};

    //op codes
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
	
	var parameterOfA9 = _Memory[0].process[_CPU.PC + 1]; 
	var constantLoaded = parameterOfA9;	
	_Memory[0].pcb.accumulator = constantLoaded;
	_CPU.PC += 2;
	//console.log(_CPU.PC);
	
	document.getElementById("accumulator").innerHTML=constantLoaded;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
} 

function loadAccumulatorFromMemory() { //AD
	
	var decimalLocationInMemoryToLoadAccumulatorFrom = parseInt(_Memory[0].process[_CPU.PC + 1] , 16);
	
	_Memory[0].pcb.accumulator = _Memory[0].process[decimalLocationInMemoryToLoadAccumulatorFrom];
	
	_CPU.PC += 3;

	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function storeAccumulatorInMemory() { //8D	
	var hexMemLocationForAccToBeStored = _Memory[0].process[_CPU.PC + 1]; //Value in hex
	
	var decimalMemLocationForAccToBeStored = parseInt(hexMemLocationForAccToBeStored, 16);

	_Memory[0].process[decimalMemLocationForAccToBeStored] = _Memory[0].pcb.accumulator;//Stores accumulator in memory location 0
	//console.log("***Storing Location dec" + decimalMemLocationForAccToBeStored);
	document.getElementById("bit" + decimalMemLocationForAccToBeStored).innerHTML=_Memory[0].pcb.accumulator;
	
	//console.log("Storing Location " + _Memory[0].process[decimalMemLocationForAccToBeStored]);
	//console.log("Acc to be stored " + _Memory[0].pcb.accumulator);
	_CPU.PC += 3;
	
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function addWithCarry() { //6D

	//console.log(" " + _Memory[0].process[_Memory[0].pcb.programCounter + 1]);
	_Memory[0].pcb.accumulator = _Memory[0].pcb.accumulator + _Memory[0].process[_CPU.PC + 1];	
	_CPU.PC += 3;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadXRegisterWithAConstant() { //A2
	
	var constantLoaded = _Memory[0].process[_CPU.PC + 1];	
	_Memory[0].pcb.xRegister = constantLoaded;
	_CPU.Xreg += 1;
	_Memory[0].pcb.programCounter += 2;

	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadXRegisterFromMmeory() { //AE
	
	_Memory[0].pcb.xRegister = _Memory[_CPU.PC + 1];
	//_CPU.Xreg += 1;
	_CPU.PC += 3;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function loadYRegisterWithAConstant() { //A0
	
	//This will be the starting memory location of the string (in decimal)
	_Memory[0].pcb.yRegister = parseInt(_Memory[0].process[_CPU.PC + 1], 16);
	
	_CPU.PC += 2;

	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}

function loadYRegisterFromMemory() { //AC	
	
	_Memory[0].pcb.yRegister = _Memory[_CPU.PC + 1];
	_CPU.Yreg += 1;
	//console.log("YReg " + _CPU.Yreg);
	_CPU.PC += 3;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function noOperation() { //EA
	_CPU.PC += 1;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function osBreak() { //00

	_CPU.PC += 1;
	_CPU.isExecuting = false;
}

function compareXRegisterToMemoryByteAndSetZToZeroIfEqual() { //EC
	
	
	var operand = _Memory[0].process[_CPU.PC + 1];
	
	var decimalMemLocation = parseInt(operand, 16);
	console.log("Compare value from mem @ " + decimalMemLocation + " which is " + parseInt(_Memory[0].process[decimalMemLocation]));
	console.log("XREG " + _CPU.Xreg); //parseInt(_Memory[0].pcb.xRegister, 16)
	
	
	if (_CPU.Xreg === parseInt(_Memory[0].process[decimalMemLocation], 16)) {

		_CPU.Zflag = 1;
	}

	_CPU.PC += 3;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function branchXBytesIfZEqualsZero() { //D0
	if (_CPU.Zflag === 0) {
		//_Memory[0].pcb.programCounter +=240; //255 - 15 = 240; PC should be 265 because 240 is added to current PC of 25
		
		//******
		console.log("Branch Value = " + parseInt(_Memory[0].process[_CPU.PC + 1], 16));
		_CPU.PC += parseInt(_Memory[0].process[_CPU.PC + 1], 16);
		
		//******
		
		console.log("zflag was 0");
		
		if (_CPU.PC > 255) {
			_CPU.PC -= 254; //PC is now 10, where we want it to be for the loop
			console.log("pc " + _CPU.PC); //PC that is branched back to
		}
	}
	else {
		_CPU.PC += 2;
		console.log("PC After loop is finished =" + _CPU.PC);
	}
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function incrementByteValue() { //EE

	
	//TODO:Add More here ???
	_CPU.PC += 3;
	
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;

}

function systemCall() { //FF

	if (_CPU.Xreg <= 2) {
		var printToConsole = parseInt(_CPU.Yreg).toString();

		for (var i = 0; i < printToConsole.length; i++) {
			_StdIn.putText(printToConsole.charAt(i));		
		}

		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	}
	
	else if (_CPU.Xreg == 3) {
	
		var startingMemoryLocationOfProgramString = _Memory[0].pcb.yRegister; //Decimal
		
		//console.log(_Memory[0].process[startingMemoryLocationOfProgramString]);
		
		while(_Memory[0].process[startingMemoryLocationOfProgramString] != "00") {
			
			var letterCode = _Memory[0].process[startingMemoryLocationOfProgramString];
			var letter = String.fromCharCode(parseInt(letterCode, 16)); //Translate to decimal
			
			_StdIn.putText(letter); 
			startingMemoryLocationOfProgramString++;
		}
		
		_StdIn.advanceLine();
		_StdIn.putText(_OsShell.promptStr);
	}
	else {
		_CPU.isExecuting = false;
		console.log("_CPU.Xreg = " + _CPU.Xreg);
	}

	
	_CPU.PC += 1;


	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_CPU.PC;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_CPU.Yreg;
	document.getElementById("zFlag").innerHTML=_CPU.Zflag;
}



















