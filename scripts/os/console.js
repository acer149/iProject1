/* ------------
   Console.js

   Requires globals.js

   The OS Console - stdIn and stdOut by default.
   Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
   ------------ */

function CLIconsole() {
    // Properties
    this.CurrentFont      = _DefaultFontFamily;
    this.CurrentFontSize  = _DefaultFontSize;
    this.CurrentXPosition = 0;
    this.CurrentYPosition = _DefaultFontSize;
    this.buffer = "";
    var commandRecallArray = new Array();
    var currentCommandInArray = 0;
    var upArrowClickCount = 0;
    var downArrowClickCount = 0;
    
    // Methods
    this.init = function() {
       this.clearScreen();
       this.resetXY();
    };

    this.clearScreen = function() {
       _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
    };

    this.resetXY = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition = this.CurrentFontSize;
    };

    this.handleInput = function() {
       while (_KernelInputQueue.getSize() > 0)
       {
           // Get the next character from the kernel input queue.
           var chr = _KernelInputQueue.dequeue();
           // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
           if (chr == String.fromCharCode(13))  //     Enter key
           {
               // The enter key marks the end of a console command, so ...
               // ... tell the shell ...
               _OsShell.handleInput(this.buffer);
               
               //****  
               //Adds the command currently in this.buffer to an array to enable command history recall             
               commandRecallArray.push(this.buffer);
               //***
               
               // ... and reset our buffer.
               this.buffer = "";
               
               //resets the command recall variable
               currentCommandInArray = 0;
           }
           // TODO: Write a case for Ctrl-C.
           //***
           //Handle Backspace
           else if (chr == String.fromCharCode(8)){
           		
           		//this.buffer.slice(-1) returns the last character from the buffer string
           		this.backspace(this.buffer.slice(-1));
           		
           		//Removes the last character from the this.buffer string
           		this.buffer = this.buffer.substring(0, this.buffer.length - 1);
           } 
           //Handle up arrow
           else if (chr == String.fromCharCode(38)) {
           		this.commandRecallForward(commandRecallArray[currentCommandInArray]);
           }
           //Handle Down Arrow
           else if (chr == String.fromCharCode(40)) {
           		this.commandRecallBack(commandRecallArray[currentCommandInArray]);
           }        
           //***
           else
           {
               // This is a "normal" character, so ...
               // ... draw it on the screen...
               this.putText(chr);
               // ... and add it to our buffer.
               this.buffer += chr;
           }
       }
    };

    this.putText = function(text) {
       // My first inclination here was to write two functions: putChar() and putString().
       // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
       // between the two.  So rather than be like PHP and write two (or more) functions that
       // do the same thing, thereby encouraging confusion and decreasing readability, I
       // decided to write one function and use the term "text" to connote string or char.
       if (text !== "")
       {
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
       }
    };
    
    //***
    this.backspace = function(text) {
    	
         // Move the current X position back one character (the parameter 'text' is sliced from the buffer)
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition - offset;
           
           //Draws a clear box over the backspaced character
           _DrawingContext.clearRect(this.CurrentXPosition, (this.CurrentYPosition - (offset + 7)) , 20, 22); //(x, y, width, height)
           
    };
    
    this.commandRecallForward = function(text) {
    
    if (upArrowClickCount == 0) {
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
           //Puts the command back into the buffer string to be used in handleInput function when enter key is pressed
           this.buffer = text;
           upArrowClickCount +=1;
    }
    else if (upArrowClickCount > 0) {
    		
    		//TODO: Make it work :/	
    		
    		//Clear the previous command
    	   // Move the current X position back one character (the parameter 'text' is sliced from the buffer)
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition - offset;
           //Draws a clear box over the backspaced character
           _DrawingContext.clearRect(this.CurrentXPosition - 8, this.CurrentYPosition - 9 , 31, 20); //(x, y, width, height)
    	
    	 
    	  //Draws the command onto the canvas
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition + 34, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
           //Puts the command back into the buffer string to be used in handleInput function when enter key is pressed
           this.buffer = text;    	
    }
    
    	if (currentCommandInArray == currentCommandInArray.length) {	
    		currentCommandInArray = currentCommandInArray;
    	}
    	else {
    		currentCommandInArray = currentCommandInArray + 1;
    	}

    };
	
	//Down Arrow
	this.commandRecallBack = function(text) {
    if (downArrowClickCount == 0) {
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
           //Puts the command back into the buffer string to be used in handleInput function when enter key is pressed
           this.buffer = text;
           upArrowClickCount +=1;
    }
    else if (downArrowClickCount > 0) {
    		
    		//TODO: Make it work :/	
    		
    				//Clear the previous command
    	   			// Move the current X position back one character (the parameter 'text' is sliced from the buffer)
           //var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           //this.CurrentXPosition = this.CurrentXPosition - offset;
           			//Draws a clear box over the backspaced character
           //_DrawingContext.clearRect(this.CurrentXPosition - 6, this.CurrentYPosition - 11 , 25, 20); //(x, y, width, height)
    	
    	 
    	  //Draws the command onto the canvas
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
           //Puts the command back into the buffer string to be used in handleInput function when enter key is pressed
           this.buffer = text;    	
    }
    
    	if (currentCommandInArray > 0) {
    		currentCommandInArray = currentCommandInArray - 1;
    	}
    	else {
    		currentCommandInArray = 0;
    	}
    	
	};  
   //***

    this.advanceLine = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition += _DefaultFontSize + _FontHeightMargin;
       
       //Handles scrolling
      if (this.CurrentYPosition > 500) {
      	
      		var consoleSnapShot = _DrawingContext.getImageData(0, _DefaultFontSize, 500, 500); //(x,y,width,height)
       	    _StdIn.clearScreen();
    		
    		_DrawingContext.putImageData(consoleSnapShot, 0, 0);
    		this.CurrentYPosition = (_DefaultFontSize + _FontHeightMargin);
       }
    };
   
}


