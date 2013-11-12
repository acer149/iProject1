//var str = '<table>';


//for (var i = 0; i < 100; i++) {
	//console.log("Hey");
	//str += '<tr>';
	//for (var x = 0; x < 8; x++) {
	//	str += '<td>'+ x + '</td>';
//	}
	//str += '</tr>';  
//}
//str += '</table>';
//console.log(document.getElementById("memoryTable").innerHTML);
//document.getElementById("memoryTable").innerHTML=str;


//document.getElementById("memoryTable").innerHTML="<th>"Memory"</th>";

function createMemory() {

var table = document.createElement("table"), th, tr, td, text;
var bitNum = 0;
var y = 0;

th = document.createElement("th");
th.setAttribute('class', 'memTableHead');
text = document.createTextNode("Memory Table");
th.appendChild(text);

table.appendChild(th);

for (var i = 0; i < (_AllMemory+2)/8; i++) {

	tr = document.createElement('tr');
	for (var x = 0; x < 8; x++) {
		
		//First td will be a "header" for the row
		if (x === 0) {
			td = document.createElement('td');
			td.setAttribute('class', 'memTDHead');
			text = document.createTextNode("$" + y);
			td.appendChild(text);
			tr.appendChild(td);
			y+=8;
		}
	
		td = document.createElement('td');
		td.setAttribute('id','bit' + bitNum);
		td.setAttribute('class', 'memTD');
		text = document.createTextNode("00");
		
		td.appendChild(text);
		tr.appendChild(td);
		bitNum++;
	}
	
	table.appendChild(tr);
		  
}
	console.log(table);
	
	var parent = document.getElementById("memoryTable");
	parent.innerHTML="";
	parent.appendChild(table);


}