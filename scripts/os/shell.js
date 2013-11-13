/* ------------
   Shell.js
   
   The OS Shell - The "command line interface" (CLI) for the console.
   ------------ */

// TODO: Write a base class / prototype for system services and let Shell inherit from it.

function Shell() {
    // Properties
    this.promptStr   = ">";
    this.commandList = [];
    this.curses      = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
    this.apologies   = "[sorry]";
    this.riddleNumber = null;
    // Methods
    this.init        = shellInit;
    this.putPrompt   = shellPutPrompt;
    this.handleInput = shellHandleInput;
    this.execute     = shellExecute;
}

function shellInit() {
    var sc = null;
    //
    // Load the command list.

    // ver
    sc = new ShellCommand();
    sc.command = "ver";
    sc.description = "- Displays the current version data.";
    sc.function = shellVer;
    this.commandList[this.commandList.length] = sc;
    
    // help
    sc = new ShellCommand();
    sc.command = "help";
    sc.description = "- This is the help command. Seek help.";
    sc.function = shellHelp;
    this.commandList[this.commandList.length] = sc;
    
    // shutdown
    sc = new ShellCommand();
    sc.command = "shutdown";
    sc.description = "- Shuts down the virtual OS but leaves the underlying hardware simulation running.";
    sc.function = shellShutdown;
    this.commandList[this.commandList.length] = sc;

    // cls
    sc = new ShellCommand();
    sc.command = "cls";
    sc.description = "- Clears the screen and resets the cursor position.";
    sc.function = shellCls;
    this.commandList[this.commandList.length] = sc;

    // man <topic>
    sc = new ShellCommand();
    sc.command = "man";
    sc.description = "<topic> - Displays the MANual page for <topic>.";
    sc.function = shellMan;
    this.commandList[this.commandList.length] = sc;
    
    // trace <on | off>
    sc = new ShellCommand();
    sc.command = "trace";
    sc.description = "<on | off> - Turns the OS trace on or off.";
    sc.function = shellTrace;
    this.commandList[this.commandList.length] = sc;

    // rot13 <string>
    sc = new ShellCommand();
    sc.command = "rot13";
    sc.description = "<string> - Does rot13 obfuscation on <string>.";
    sc.function = shellRot13;
    this.commandList[this.commandList.length] = sc;

    // prompt <string>
    sc = new ShellCommand();
    sc.command = "prompt";
    sc.description = "<string> - Sets the prompt.";
    sc.function = shellPrompt;
    this.commandList[this.commandList.length] = sc;
    
    //date
    sc = new ShellCommand();
    sc.command = "date";
    sc.description = "- Displays the current date and time.";
    sc.function = shellDate;
    this.commandList[this.commandList.length] = sc;
    
    //whereami
    sc = new ShellCommand();
    sc.command = "whereami";
    sc.description = " - Displays the users current location.";
    sc.function = shellWhereAmI;
    this.commandList[this.commandList.length] = sc;
  
    //riddle 
    sc = new ShellCommand();
    sc.command = "riddles";
    sc.description = " - Play a riddle game.";
    sc.function = shellStartRiddles;
    this.commandList[this.commandList.length] = sc;
        
	//status <string>
	sc = new ShellCommand();
	sc.command = "status";
	sc.description = "<string> - Changes the status in the bar above.";
	sc.function = shellStatus;
	this.commandList[this.commandList.length] = sc;
	
	//bsodTest
	sc = new ShellCommand();
	sc.command = "bsod";
	sc.description = " - Blue Screen of Death.";
	sc.function = shellBSODTest;
	this.commandList[this.commandList.length] = sc;
	
	//load
	sc = new ShellCommand();
	sc.command = "load";
	sc.description = " - Checks user's code in the text area for errors.";
	sc.function = shellLoad;
	this.commandList[this.commandList.length] = sc;
	
	//run <pid>
	sc = new ShellCommand();
	sc.command = "run";
	sc.description = "<pid> - Runs a process in memory.";
	sc.function = shellRun;
	this.commandList[this.commandList.length] = sc;
	
	//runall
	sc = new ShellCommand();
	sc.command = "runall";
	sc.description = " - Runs all processes in memory.";
	sc.function = shellRunAll;
	this.commandList[this.commandList.length] = sc;
	
	//processes
	sc = new ShellCommand();
	sc.command = "processes";
	sc.description = " - Displays all active pids.";
	sc.function = shellProcesses;
	this.commandList[this.commandList.length] = sc;
	
	//quantum
	sc = new ShellCommand();
	sc.command = "quantum";
	sc.description = "<int> - Sets the Round Robin quantum.";
	sc.function = shellQuantum;
	this.commandList[this.commandList.length] = sc;
    
    //kill
    sc = new ShellCommand();
    sc.command = "kill";
    sc.description = "<id> - Kills the active process specified.";
    sc.function = shellKill;
    this.commandList[this.commandList.length] = sc;
   
    // kill <id> - kills the specified process id.

    //
    // Display the initial prompt.
    this.putPrompt();
}

function shellPutPrompt()
{
    _StdIn.putText(this.promptStr);
}

function shellHandleInput(buffer)
{
    krnTrace("Shell Command~" + buffer);
    // 
    // Parse the input...
    //
    var userCommand = new UserCommand();
    userCommand = shellParseInput(buffer);
    // ... and assign the command and args to local variables.
    var cmd = userCommand.command;
    var args = userCommand.args;
    //
    // Determine the command and execute it.
    //
    // JavaScript may not support associative arrays in all browsers so we have to
    // iterate over the command list in attempt to find a match.  TODO: Is there a better way? Probably.
    var index = 0;
    var found = false;
    while (!found && index < this.commandList.length)
    {
        if (this.commandList[index].command === cmd)
        {
            found = true;
            var fn = this.commandList[index].function;
        }
        else
        {
            ++index;
        }
    }
    if (found)
    {
        this.execute(fn, args);
    }
    else
    {
        // It's not found, so check for curses, apologies, and riddle answers before declaring the command invalid.
        if (this.curses.indexOf("[" + rot13(cmd) + "]") >= 0)      // Check for curses.
        {
            this.execute(shellCurse);
        }
        else if (this.apologies.indexOf("[" + cmd + "]") >= 0)      // Check for apologies.
        {
            this.execute(shellApology);
        }
        //****
        //Riddles Check
        if (_RiddleMode) {
        	if (riddleNumber === 1) {
        		if(cmd === "mountain" || cmd === "mountains") {
        			_StdIn.advanceLine();
        			_StdIn.putText("***Correct!***");
        			_StdIn.advanceLine();
        			_riddlesCorrect = _riddlesCorrect + 1;
        			this.execute(shellSecondRiddle);
        		}
        		else if (cmd === "quit") {
        			this.execute(shellQuitRiddles);
        		}
        		else {
        			_StdIn.advanceLine();
        			_StdIn.putText("Incorrect! The answer was 'mountain'.");
        			_StdIn.advanceLine();
        			this.execute(shellSecondRiddle);
        		}
        	}
        	else if (riddleNumber === 2) {
        		if (cmd === "teeth") {
        			_StdIn.advanceLine();
        			_StdIn.putText("***Correct!***");
        			_StdIn.advanceLine();
        			_riddlesCorrect = _riddlesCorrect + 1;
        			this.execute(shellThirdRiddle);
        		}
        		else if (cmd === "quit") {
        			this.execute(shellQuitRiddles);
        		}
        		else {
        			_StdIn.advanceLine();
        			_StdIn.putText("Incorrect! The answer was 'teeth'.");
        			_StdIn.advanceLine();
        			this.execute(shellThirdRiddle);
        		}
        	}
        	else if (riddleNumber === 3) {
        		if (cmd === "time") {
        			_StdIn.advanceLine();
        			_StdIn.advanceLine();
        			_StdIn.advanceLine();
        			_StdIn.putText("***Correct!***");
        			_StdIn.advanceLine();
        			_riddlesCorrect = _riddlesCorrect + 1;
        			this.execute(shellFinish);
        		}
        		else if (cmd === "quit") {
        			this.execute(shellQuitRiddles);
        		}
        		else {
        			_StdIn.advanceLine();
        			_StdIn.advanceLine();
        			_StdIn.advanceLine();
        			_StdIn.putText("Incorrect! The answer was 'time'.");
        			_StdIn.advanceLine();
        			this.execute(shellFinish);
        		}
        	}
        }
        //*****
        else    // It's just a bad command.
        {
            this.execute(shellInvalidCommand);
        }
    }
}

function shellParseInput(buffer)
{
    var retVal = new UserCommand();

    // 1. Remove leading and trailing spaces.
    buffer = trim(buffer);

    // 2. Lower-case it.
    buffer = buffer.toLowerCase();

    // 3. Separate on spaces so we can determine the command and command-line args, if any.
    var tempList = buffer.split(" ");

    // 4. Take the first (zeroth) element and use that as the command.
    var cmd = tempList.shift();  // Yes, you can do that to an array in JavaScript.  See the Queue class.
    // 4.1 Remove any left-over spaces.
    cmd = trim(cmd);
    // 4.2 Record it in the return value.
    retVal.command = cmd;

    // 5. Now create the args array from what's left.
    for (var i in tempList)
    {
        var arg = trim(tempList[i]);
        if (arg != "")
        {
            retVal.args[retVal.args.length] = tempList[i];
        }
    }
    return retVal;
}

function shellExecute(fn, args)
{
    // We just got a command, so advance the line...
    _StdIn.advanceLine();
    // ... call the command function passing in the args...
    fn(args);
    // Check to see if we need to advance the line again
    if (_StdIn.CurrentXPosition > 0)
    {
        _StdIn.advanceLine();
    }
    // ... and finally write the prompt again.
    this.putPrompt();
}


//
// The rest of these functions ARE NOT part of the Shell "class" (prototype, more accurately), 
// as they are not denoted in the constructor.  The idea is that you cannot execute them from
// elsewhere as shell.xxx .  In a better world, and a more perfect JavaScript, we'd be
// able to make then private.  (Actually, we can. have a look at Crockford's stuff and Resig's JavaScript Ninja cook.)
//

//
// An "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function ShellCommand()     
{
    // Properties
    this.command = "";
    this.description = "";
    this.function = "";
}

//
// Another "interior" or "private" class (prototype) used only inside Shell() (we hope).
//
function UserCommand()
{
    // Properties
    this.command = "";
    this.args = [];
}


//
// Shell Command Functions.  Again, not part of Shell() class per se', just called from there.
//
function shellInvalidCommand()
{
    _StdIn.putText("Invalid Command. ");
    if (_SarcasticMode)
    {
        _StdIn.putText("Duh. Go back to your Speak & Spell.");
    }
    else
    {
        _StdIn.putText("Type 'help' for, well... help.");
    }
}

function shellCurse()
{
    _StdIn.putText("Oh, so that's how it's going to be, eh? Fine.");
    _StdIn.advanceLine();
    _StdIn.putText("Bitch.");
    _SarcasticMode = true;
}

function shellApology()
{
   if (_SarcasticMode) {
      _StdIn.putText("Okay. I forgive you. This time.");
      _SarcasticMode = false;
   } else {
      _StdIn.putText("For what?");
   }
}

function shellVer(args)
{
    _StdIn.putText(APP_NAME + " version " + APP_VERSION);    
}

function shellHelp(args)
{
    _StdIn.putText("Commands:");
    for (var i in _OsShell.commandList)
    {
        _StdIn.advanceLine();
        _StdIn.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
    }    
}

function shellShutdown(args)
{
     _StdIn.putText("Shutting down...");
     // Call Kernel shutdown routine.
    krnShutdown();   
    // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
}

function shellCls(args)
{
    _StdIn.clearScreen();
    _StdIn.resetXY();
}

function shellMan(args)
{
    if (args.length > 0)
    {
        var topic = args[0];
        switch (topic)
        {
            case "help": 
                _StdIn.putText("Help displays a list of (hopefully) valid commands.");
                break;
            default:
                _StdIn.putText("No manual entry for " + args[0] + ".");
        }        
    }
    else
    {
        _StdIn.putText("Usage: man <topic>  Please supply a topic.");
    }
}

function shellTrace(args)
{
    if (args.length > 0)
    {
        var setting = args[0];
        switch (setting)
        {
            case "on": 
                if (_Trace && _SarcasticMode)
                {
                    _StdIn.putText("Trace is already on, dumbass.");
                }
                else
                {
                    _Trace = true;
                    _StdIn.putText("Trace ON");
                }
                
                break;
            case "off": 
                _Trace = false;
                _StdIn.putText("Trace OFF");                
                break;                
            default:
                _StdIn.putText("Invalid arguement.  Usage: trace <on | off>.");
        }        
    }
    else
    {
        _StdIn.putText("Usage: trace <on | off>");
    }
}

function shellRot13(args)
{
    if (args.length > 0)
    {
        _StdIn.putText(args[0] + " = '" + rot13(args[0]) +"'");     // Requires Utils.js for rot13() function.
    }
    else
    {
        _StdIn.putText("Usage: rot13 <string>  Please supply a string.");
    }
}

function shellPrompt(args)
{
    if (args.length > 0)
    {
        _OsShell.promptStr = args[0];
    }
    else
    {
        _StdIn.putText("Usage: prompt <string>  Please supply a string.");
    }
}

function shellDate(args) {
	
	var currentDate = new Date();
	var amOrpm = "";

	var hours = currentDate.getHours();
	if (hours >= 12) {
		hours = hours - 12;
		amOrpm = "pm";
	}
	else {
		amOrpm = "am";
	}
	
	var minutes = currentDate.getMinutes();
	switch (minutes) {
		case 0:
			minutes = "0" + minutes;
			break;		
		case 1:
			minutes = "0" + minutes;
			break;
		case 2:
			minutes = "0" + minutes;
			break;
		case 3:
			minutes = "0" + minutes;
			break;
		case 4:
			minutes = "0" + minutes;
			break;
		case 5:
			minutes = "0" + minutes;
			break;
		case 6:
			minutes = "0" + minutes;
			break;
		case 7:
			minutes = "0" + minutes;
			break;
		case 8:
			minutes = "0" + minutes;
			break;
		case 9:
			minutes = "0" + minutes;
			break;
		default:
			minutes = minutes;
			break;	
	};
	
	var theDate = (currentDate.getMonth() + 1)  + "/" + currentDate.getDate()  + "/" + currentDate.getFullYear();
	var theTime = (hours + ":" + minutes + amOrpm);

	_StdIn.putText("It is " + theTime + " on " + theDate); 	
}

function shellWhereAmI(args) {
	_StdIn.putText("http://www.amazon.com  <-- Search for GPS");

}

function shellStartRiddles(args) {
	
	//Turns on Riddle Mode
	_RiddleMode = true;	
	_StdIn.putText("All riddles are the property of J.R.R. Tolkien.");
	_StdIn.advanceLine();
	_StdIn.putText("Type 'quit' at any time to, well, quit.");
	_StdIn.advanceLine();
	_StdIn.advanceLine();
	
	//Keeps track of what riddle user is on
	riddleNumber = 1;
	_StdIn.putText("Riddle 1:");	
	_StdIn.advanceLine();
	_StdIn.putText("What has roots as nobody sees,");
	_StdIn.advanceLine();
	_StdIn.putText("Is taller than trees,");
	_StdIn.advanceLine();
	_StdIn.putText("Up, up it goes,");
	_StdIn.advanceLine();
	_StdIn.putText("And yet never grows?");
	_StdIn.advanceLine();
}

function shellSecondRiddle(args) {
	//Keeps track of what riddle user is on
	riddleNumber = 2;
	_StdIn.putText("Riddle 2:");
	_StdIn.advanceLine();
	_StdIn.putText("Thirty white horses on a red hill,");
	_StdIn.advanceLine();
	_StdIn.putText("First they champ,");
	_StdIn.advanceLine();
	_StdIn.putText("Then they stamp,");
	_StdIn.advanceLine();
	_StdIn.putText("Then they stand still.");
	_StdIn.advanceLine();
	
}

function shellThirdRiddle(args) {
	//Keeps track of what riddle user is on
	riddleNumber = 3;
	_StdIn.putText("Riddle 3:");
	_StdIn.advanceLine();
	_StdIn.putText("This thing all things devours:");
	_StdIn.advanceLine();
	_StdIn.putText("Birds, beasts, trees, flowers;");
	_StdIn.advanceLine();
	_StdIn.putText("Gnaws iron, bites steel;");
	_StdIn.advanceLine();
	_StdIn.putText("Grinds hard stones to meal;");
	_StdIn.advanceLine();
	_StdIn.putText("Slays king, ruins town,");
	_StdIn.advanceLine();
	_StdIn.putText("And beats high mountain down.");
	_StdIn.advanceLine();
}

function shellFinish(args) {
	if (_riddlesCorrect === 3) {
		_StdIn.putText("Nice job!! You answered all " + _riddlesCorrect + " of the riddles correct.");
		this.riddleNumber = null;
		_riddlesCorrect = 0;
		_RiddleMode = false;		
	}
	else if (_riddlesCorrect === 2) {
		_StdIn.putText("Sweet!! You answered " + _riddlesCorrect + " of the riddles correct.");
		this.riddleNumber = null;
		_riddlesCorrect = 0;
		_RiddleMode = false;
	}
	else {
		_StdIn.putText("You answered " + _riddlesCorrect + " of the riddles correct.");
		_StdIn.advanceLine();
		_StdIn.putText("You might want to brush up on your riddle skills.");
		this.riddleNumber = null;
		_riddlesCorrect = 0;
		_RiddleMode = false;
	}
}

function shellQuitRiddles(args) {
	_StdIn.putText("Thanks for playing!");
	this.riddleNumber = null;
	_riddlesCorrect = 0;
	_RiddlesMode = false;
}

function shellStatus(args) {
	if (args.length > 0)
    {
        var status = args[0];
        document.getElementById("statBar").innerHTML=status;
    }
    else
    {
        _StdIn.putText("Usage: status <string>  Please supply a string.");
    }	
}

function shellBSODTest() {
	krnTrapError();
}

function shellLoad() {
	var userProgram = document.getElementById("taProgramInput").value;
	
	if (userProgram.match("^[0-9A-F \n]+$")) {
		_StdIn.putText("Your user code is valid");
		
		var tempString = userProgram.split(" ");
		
		//Checks if process is longer than memory block size
		if(tempString.length > (_MemoryBlock + 1)){
		
			_StdIn.advanceLine();
			_StdIn.putText("However...");
			_StdIn.advanceLine();
			_StdIn.putText("Your process, exceeds the memory partition size and will");
			_StdIn.advanceLine();
			_StdIn.putText("not be executed.");
		}
		else {

			var pid = _LastPid + 1;
			//Increments for multiple processes
			_LastPid = pid;

			//Creates a pcb for the process
			var pcb = new ProcessControlBlock(pid);

			//Assigns a memory base and limit to each process
			pcb = assignMemorySlot(pcb);

			//Stores the pcb in the _ResidentList. The location in the _ResidentList will the the pid of the program
			_ResidentList[pid] = pcb;
			//console.log(_ResidentList); 


			//Loads the user program into the memory display in index.html
			for (var i = 0; i < _AllMemory; i++) {
				document.getElementById("bit" + i).innerText = _Memory[i];
			}

		}
				
	}
	else {
		_StdIn.putText("Your user code is NOT valid");
	}
}

function shellRun(args) {
	if (args.length > 0) {
		var pidToBeRun = args[0];
		
		//Checks if the pid exists
		if (parseInt(pidToBeRun) === parseInt(_ResidentList[pidToBeRun].pid)) {
			
			_CurrentProcessPCB = _ResidentList[pidToBeRun];
			
			//Sets the current process based on the base and limit of the process in memory
			var base = parseInt(_CurrentProcessPCB.base);
			var limit = parseInt(_CurrentProcessPCB.limit);
			var i = 0;
			
			while (base <= limit) {
				_CurrentProcess[i] = _Memory[base];

				i++;
				base++;
			}
			
				_CPU.isExecuting = true;	
		}
		else {
			_StdIn.putText("No process exists with the entered pid.");
		}
	}
	else {
		_StdIn.putText("Usage: run <pid>  Please supply a pid.");
	}
}

function shellRunAll() {
	
	var aProcess = null;
	
	for (processIndex in _ResidentList) {
		
		aProcess = _ResidentList[processIndex];
		
		//Removes the process from the _ResidentList
		delete _ResidentList[processIndex];
		
		_ReadyQueue.enqueue(aProcess);
	}
	
	
		console.log("Ready Queue b4 pop = " + _ReadyQueue);
		//Gets a currentProcess from the ready queue (pcb) and sets the base and limit 
		_CurrentProcessPCB = _ReadyQueue.dequeue();
		console.log("Ready Queue after pop = " + _ReadyQueue);
		var base = parseInt(_CurrentProcessPCB.base);
		var limit = parseInt(_CurrentProcessPCB.limit);
		var i = 0;
			
		//Puts the process to execute in a current process array
		while (base <= limit) {
			_CurrentProcess[i] = _Memory[base];

			i++;
			base++;
		}
		
		_RoundRobinActive = true;
		_CPU.isExecuting = true;		
}

//Shows active pids on the console
function shellProcesses() {
	if (_ResidentList.length > 1) {
		
		_StdIn.putText("Active pid's: ");
	}
	
	for (var i =0; i < _ResidentList.length; i++) {
		
		//If displaying the last active pid, do not place a "," after it
		if (i != (_ResidentList.length - 1)) {
			_StdIn.putText(_ResidentList[i].pid.toString() + ", ");	
		}
		else{
			_StdIn.putText(_ResidentList[i].pid.toString());
		}
		
	}	
}

//Set the Round Robin quantum
function shellQuantum(args) {
	if (args.length > 0) {
		var newQuantum = parseInt(args[0]);
		
		RoundRobinQuantum = newQuantum;
		_StdIn.putText("Round Robin quantum now set to: " + newQuantum);
		
	}
	else {
		_StdIn.putText("Usage: quantum <int>  Please supply an int.");
	}	
}

//Kills an active process
function shellKill(args) {	
	
	var processToKill = null;
	
	//Check to see if a pid is specified
	if (args.length > 0) {
		var pidOfProcessToKill = parseInt(args[0]);
		
		//If the current running process has been identified as the victim of the kill cmd, mark that process as ended and 
		//perform a context switch (it will not be added back to the ready queue because it has been flagged as ended, see scheduler.js)
		if (_CurrentProcessPCB.pid === pidOfProcessToKill) {
			processToKill = _CurrentProcessPCB;
			processToKill.processState = "Ended";
			
			_StdIn.putText("Killed process with pid: " + pidOfProcessToKill);
			_StdIn.advanceLine();
			_StdIn.putText(">");
			krnTrace("Killed the current running process with pid: " + pidOfProcessToKill);
						
			
			performContextSwitch();	
		}
		//Checks ready queue for the victim, if found mark as ended and remove from ready queue
		else {
			for (var i = 0; i < _ReadyQueue.getSize(); i++) {
				 if (_ReadyQueue.getQueuedItem(i).pid === pidOfProcessToKill) {
				 	processToKill = _ReadyQueue.getQueuedItem(i);
				 	processToKill.processState = "Ended";
				 	
				 	_StdIn.putText("Killed process on the ready queue with pid: " + pidOfProcessToKill);
				 	_StdIn.advanceLine();
				 	_StdIn.putText(">");
				 	krnTrace("Killed the process on the ready queue with pid: " + pidOfProcessToKill);
				 	
				 	_ReadyQueue.splice(i, 1);	
				 	
				 }
			}
		}
		if (processToKill === null) {
				 _StdIn.putText("No process with entered pid exists.");
		}
			
	}
	else {
		_StdIn.putText("Usage: kill <pid>  Please supply a pid.");
	}
	
}

//Allows for continuous update of statusbar clock
setInterval(function taskBarDate(args){ 
	var currentDate = new Date();
	var amOrpm = "";

	var hours = currentDate.getHours();
	if (hours > 12) {
		hours = hours - 12;
		amOrpm = "pm";
	}
	else if (hours === 12) {
		amOrpm = "pm";
	}
	else if (hours === 0) {
		hours = 12;
		amOrpm = "am";
	}
	else {
		amOrpm = "am";
	}
	
	//Switch statement for minutes 00-09
	var minutes = currentDate.getMinutes();
	switch (minutes) {
		case 0:
			minutes = "0" + minutes;
			break;		
		case 1:
			minutes = "0" + minutes;
			break;
		case 2:
			minutes = "0" + minutes;
			break;
		case 3:
			minutes = "0" + minutes;
			break;
		case 4:
			minutes = "0" + minutes;
			break;
		case 5:
			minutes = "0" + minutes;
			break;
		case 6:
			minutes = "0" + minutes;
			break;
		case 7:
			minutes = "0" + minutes;
			break;
		case 8:
			minutes = "0" + minutes;
			break;
		case 9:
			minutes = "0" + minutes;
			break;
		default:
			minutes = minutes;
			break;	
	};
	
	//Switch statement for seconds 00-09
	var seconds = currentDate.getSeconds();
	switch (seconds) {
		case 0:
			seconds = "0" + seconds;
			break;		
		case 1:
			seconds = "0" + seconds;
			break;
		case 2:
			seconds = "0" + seconds;
			break;
		case 3:
			seconds = "0" + seconds;
			break;
		case 4:
			seconds = "0" + seconds;
			break;
		case 5:
			seconds = "0" + seconds;
			break;
		case 6:
			seconds = "0" + seconds;
			break;
		case 7:
			seconds = "0" + seconds;
			break;
		case 8:
			seconds = "0" + seconds;
			break;
		case 9:
			seconds = "0" + seconds;
			break;
		default:
			seconds = seconds;
			break;	
	};

	var theDate = (currentDate.getMonth() + 1)  + "/" + currentDate.getDate()  + "/" + currentDate.getFullYear();
	var theTime = (" <> " + hours + ":" + minutes + ":" + seconds + amOrpm);
	var theDateAndTime = theDate + theTime;
	document.getElementById("divStatusBar").innerHTML=theDateAndTime;
	    
}, 500);

