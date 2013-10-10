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
        //console.log(opcodeToRun);
        run(_OpcodeArray[opcodeToRun]);
    };
    
}

	this.getOpcode = function() {
	return _Memory[0].pcb.programCounter;
	
	};

    //op codes
    //Will identify the user process's opcodes and call the associated function of that opcode
    this.run = function(opcode) {
    	//TODO: Add more to case statements??
    	
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


function loadAccumulatorWithAConstant() {
	console.log("Reached loadAccumulatorWithAConstant");
	
	_Memory[0].pcb.accumulator = _Memory[0].process[_Memory[0].pcb.programCounter + 2];
	_Memory[0].pcb.programCounter += 1;
	document.getElementById("accumulator").innerHTML=_Memory[0].pcb.accumulator;
	document.getElementById("programCounter").innerHTML=_Memory[0].pcb.programCounter;
	document.getElementById("xRegister").innerHTML=_Memory[0].pcb.xRegister;
	document.getElementById("yRegister").innerHTML=_Memory[0].pcb.yRegister;
	document.getElementById("zFlag").innerHTML=_Memory[0].pcb.zFlag;

} 

function loadAccumulatorFromMemory() {
	console.log("Reached loadAccumulatorFromMemory");
	_Memory[0].pcb.programCounter += 1;

}

function storeAccumulatorInMemory() {
	console.log("Reached storeAccumulatorInMemory");
	_Memory[0].pcb.programCounter += 1;

}

function addWithCarry() {
	console.log("Reached addWithCarry");
	_Memory[0].pcb.programCounter += 1;

}

function loadXRegisterWithAConstant() {
	console.log("Reached loadXRegisterWithAConstant");
	_Memory[0].pcb.programCounter += 1;

}

function loadXRegisterFromMmeory() {
	console.log("Reached loadXRegisterFromMmeory");
	_Memory[0].pcb.programCounter += 1;

}

function loadYRegisterWithAConstant() {
	console.log("Reached loadYRegisterWithAConstant");
	_Memory[0].pcb.programCounter += 1;

}

function loadYRegisterFromMemory() {
	console.log("Reached loadYRegisterFromMemory");
	_Memory[0].pcb.programCounter += 1;

}

function noOperation() {
	console.log("Reached noOperation");
	_Memory[0].pcb.programCounter += 1;

}

function osBreak() {
	console.log("Reached osBreak");
	_Memory[0].pcb.programCounter += 1;
	
}

function compareXRegisterToMemoryByteAndSetZToZeroIfEqual() {
	console.log("Reached compareXRegisterToMemoryByteAndSetZToZeroIfEqual");
	_Memory[0].pcb.programCounter += 1;

}

function branchXBytesIfZEqualsZero() {
	console.log("Reached branchXBytesIfZEqualsZero");
	_Memory[0].pcb.programCounter += 1;

}

function incrementByteValue() {
	console.log("Reached incrementByteValue");
	_Memory[0].pcb.programCounter += 1;

}

function systemCall() {
	console.log("Reached systemCall");
	_Memory[0].pcb.programCounter += 1;

}



















