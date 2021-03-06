/* ------------  
   Globals.js

   Global CONSTANTS and _Variables.
   (Global over both the OS and Hardware Simulation / Host.)
   
   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

//
// Global CONSTANTS
//
var APP_NAME = "MikeOS";  // 'cause I was at a loss for a better name.
var APP_VERSION = "1.02";   // What did you expect?

var CPU_CLOCK_INTERVAL = 100;   // This is in ms, or milliseconds, so 1000 = 1 second.

var TIMER_IRQ = 0;  // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority).
                    // NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
var KEYBOARD_IRQ = 1;  

var CONTEXT_SWITCH_IRQ = 2;
//
// Global Variables
//
var _CPU = null;

var _OSclock = 0;       // Page 23.

var _Mode = 0;   // 0 = Kernel Mode, 1 = User Mode.  See page 21.

var _Canvas = null;               // Initialized in hostInit().
var _DrawingContext = null;       // Initialized in hostInit().
var _DefaultFontFamily = "sans";  // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
var _DefaultFontSize = 13;
var _FontHeightMargin = 4;        // Additional space added to font size when advancing a line.

//Memory
var _AllMemory = 767;
var _MemoryBlock = 255;
var _Memory = null;

//start at 5 to allow loading of additional programs
var _LastMemoryLocation = 5;

//PCB
var _LastPid = -1;

//UserProcess
var _ReadyQueue;
//var _OpcodeArray;
var _ResidentList;

var _CurrentProcessPCB;
var _CurrentProcess;

//Default quantum, set through quantum <int> shell cmd
var RoundRobinQuantum = 6; 
var _RoundRobinActive = false;
var _CpuCycleCount = 1;

//First Come First Serve
var _FCFS = false;

//Non-Premptive Priority
var _Priority = false;

// Default the OS trace to be on.
var _Trace = true;

// OS queues
var _KernelInterruptQueue = null;
var _KernelBuffers = null;
var _KernelInputQueue = null;

// Standard input and output
var _StdIn  = null;
var _StdOut = null;


// UI
var _Console = null;
var _OsShell = null;

// At least this OS is not trying to kill you. (Yet.)
var _SarcasticMode = false;

//Riddle Mode
var _RiddleMode = false;
var _riddlesCorrect = 0;

// Global Device Driver Objects - page 12
var krnKeyboardDriver = null;
var krnFileSystemDriver = null;

// For testing...
var _GLaDOS = null;
