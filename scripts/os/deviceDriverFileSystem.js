/* ----------------------------------
   DeviceDriverFileSystem.js
   
   Requires deviceDriver.js
   
   The Kernel File System Device Driver.
   ---------------------------------- */

DeviceDriverFileSystem.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.

function DeviceDriverFileSystem() {
	this.driverEntry = FSDriverEntry;
	this.isr = null;
	
}

function FSDriverEntry() {
	this.status = "loaded";
	
	createFS();
}

function createFS() {
	
	localStorage.clear();
	
	var key = "";
	var value = "";
	
	var fileData = [];
	
	//Fills the data area with '~' initially
	for(var fileDataSize = 1; fileDataSize < 59; fileDataSize++) {
		fileData[0]= "\"~";
		fileData[fileDataSize] = "~";
		fileData[59]= "~\"";		
	}
	
	for(var track = 0; track <= 3; track++) {
		for(var sector = 0; sector <= 7; sector++) {
			for(var block = 0; block <= 7; block++) {
				
				key = [track, sector, block];
				value = ["0", "~", "~", "~", fileData];
				
				localStorage[key] = value;
				
			}
		}
	}
	//Place Master Boot Record in location 000
	var mbr = ["1", "M", "B", "R", fileData];
	localStorage["0,0,0"] = mbr;
}
