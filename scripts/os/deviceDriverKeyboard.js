/* ----------------------------------
   DeviceDriverKeyboard.js
   
   Requires deviceDriver.js
   
   The Kernel Keyboard Device Driver.
   ---------------------------------- */

DeviceDriverKeyboard.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.

function DeviceDriverKeyboard()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // this.buffer = "";    // TODO: Do we need this?
    // Override the base method pointers.
    this.driverEntry = krnKbdDriverEntry;
    this.isr = krnKbdDispatchKeyPress;
    // "Constructor" code.
}

function krnKbdDriverEntry()
{
    // Initialization routine for this, the kernel-mode Keyboard Device Driver.
    this.status = "loaded";
    // More?
}

function krnKbdDispatchKeyPress(params)
{
    // Parse the params.    TODO: Check that they are valid and osTrapError if not.
    var keyCode = params[0];
    var isShifted = params[1];
    krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
    var chr = "";
    // Check to see if we even want to deal with the key that was pressed.
    if ( ((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
         ((keyCode >= 97) && (keyCode <= 122)) )    // a..z


    {
        // Determine the character we want to display.  
        // Assume it's lowercase...
        chr = String.fromCharCode(keyCode + 32);
        // ... then check the shift key and re-adjust if necessary.
        if (isShifted)
        {
            chr = String.fromCharCode(keyCode);
        }
        // TODO: Check for caps-lock and handle as shifted if so.
        _KernelInputQueue.enqueue(chr);        
    }    
    else if ( ((keyCode >= 48) && (keyCode <= 57)) ||   // digits 
               (keyCode == 32)                     ||   // space
               (keyCode == 13)                     ||   // enter  
               (keyCode == 8) ) 						//backspace	     
    {    	    	
		//Punctuation when shift key is pressed
		if (isShifted) {
			switch(keyCode) {
				case 48:
					chr = String.fromCharCode(keyCode - 7); // )
					break;
				case 49:
					chr = String.fromCharCode(keyCode - 16); // !
					break; 
				case 50:
					chr = String.fromCharCode(keyCode + 14); // @
					break;
				case 51:
					chr = String.fromCharCode(keyCode - 16); // #
					break;
				case 52:
					chr = String.fromCharCode(keyCode - 16); // $
					break;
				case 53:
					chr = String.fromCharCode(keyCode - 16); // %
					break;
				//TODO: Displays up arrow instead of caret. Why??
				case 54:
					chr = String.fromCharCode(keyCode + 40); // ^
					break;
				case 55:
					chr = String.fromCharCode(keyCode - 17); // &
					break;
				case 56:
					chr = String.fromCharCode(keyCode - 14); // *
					break;
				case 57:
					chr = String.fromCharCode(keyCode - 17); // (
					break;
				default:
					break;
			}	
		}
		//If shift isn't pressed, print number
		else {
       		chr = String.fromCharCode(keyCode);
       }
       _KernelInputQueue.enqueue(chr);
	}
	//Checks for other punctuation
    else if (  (keyCode == 186)					   ||   // ;  or with shift :
               (keyCode == 187)					   ||   // =  or with shift +
               (keyCode == 188)					   ||   // ,  or with shift <
			   (keyCode == 189)					   ||   // -  or with shift _
			   (keyCode == 190)					   ||   // .  or with shift >
			   (keyCode == 191)					   ||   // /  or with shift ?
			   (keyCode == 192)					   ||   // `  or with shift ~
			   (keyCode == 219)					   ||   // [  or with shift {
			   (keyCode == 220)					   ||   // \  or with shift |
			   (keyCode == 221)					   ||   // ]  or with shift }
			   (keyCode == 222) )					    // '  or with shift "
               
    {		
    		//Shift Not Pressed
			switch(keyCode) {
				case 186:
					chr = String.fromCharCode(keyCode - 127); // ;
					break;
				case 187:
					chr = String.fromCharCode(keyCode - 126); // =
					break; 
				case 188:
					chr = String.fromCharCode(keyCode - 144); // ,
					break;
				case 189:
					chr = String.fromCharCode(keyCode - 144); // -
					break;
				case 190:
					chr = String.fromCharCode(keyCode - 144); // .
					break;
				case 191:
					chr = String.fromCharCode(keyCode - 144); // /
					break;
				case 192:
					chr = String.fromCharCode(keyCode - 96); // `
					break;
				case 219:
					chr = String.fromCharCode(keyCode - 128); // [
					break;
				case 220:
					chr = String.fromCharCode(keyCode - 128); // \
					break;
				case 221:
					chr = String.fromCharCode(keyCode - 128); // ]
					break;
				case 222:
					chr = String.fromCharCode(keyCode - 183); // '
					break;
				default:
					break;
			}
			
			//Shift Pressed
			if(isShifted) {
				switch(keyCode) {
					case 186:
						chr = String.fromCharCode(keyCode - 128); // :
						break;
					case 187:
						chr = String.fromCharCode(keyCode - 144); // +
						break; 
					case 188:
						chr = String.fromCharCode(keyCode - 128); // <
						break;
					case 189:
						chr = String.fromCharCode(keyCode - 94); // _
						break;
					case 190:
						chr = String.fromCharCode(keyCode - 128); // >
						break;
					case 191:
						chr = String.fromCharCode(keyCode - 128); // ?
						break;
					case 192:
						chr = String.fromCharCode(keyCode - 66); // ~
						break;
					case 219:
						chr = String.fromCharCode(keyCode - 96); // {
						break;
					case 220:
						chr = String.fromCharCode(keyCode - 96); // |
						break;
					case 221:
						chr = String.fromCharCode(keyCode - 96); // }
						break;
					case 222:
						chr = String.fromCharCode(keyCode - 188); // "
						break;
					default:
						break;
				}
			}
		_KernelInputQueue.enqueue(chr);
	}
}


