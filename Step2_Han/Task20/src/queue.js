/* author : HanYifan
**
**    2016/4/8
*/


// namespace ;
var Global = {}

window.onload = function() {
	
	Global.content = document.getElementById("content");
	Global.output = document.getElementById("output");
	Global.keyword = document.getElementById("keyword");
	Global.dom = new Array();
	Global.queue = new Array();
	var buttons = document.getElementsByTagName("button");

	//Add lintener to each Buttons;
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].id == "AddLf") buttons[i].addEventListener("click", AddLeft);
		else if (buttons[i].id == "AddRi") buttons[i].addEventListener("click", AddRight);
		else if (buttons[i].id == "DeleteLf") buttons[i].addEventListener("click", DeleteLeft);
		else if (buttons[i].id == "DeleteRi") buttons[i].addEventListener("click", DeleteRight);
		else if (buttons[i].id == "Search") buttons[i].addEventListener("click", Search);
	}

	keyword.addEventListener("input", Search);
}

//Add an element to the left;
function AddLeft() {
	CheckData();
	while (Global.queue.length != 0) {
		var newElement = document.createElement("div");
		newElement.innerText = Global.queue.shift();
		newElement.className += "output";
		newElement.addEventListener("click", SelfDelete);
		var firstchild = Global.output.firstChild;
		Global.output.insertBefore(newElement, firstchild);
		Global.dom.push(newElement);
	}
	Search();
}

//Add an element to the right;
function AddRight() {
	CheckData();
	while (Global.queue.length != 0) {
		var newElement = document.createElement("div");
		newElement.innerText = Global.queue.shift();
		newElement.className += "output";
		newElement.addEventListener("click", SelfDelete);
		Global.output.appendChild(newElement);
		Global.dom.push(newElement);
	}
	Search();
}

//Delete an element on the left;
function DeleteLeft() {
	alert("Delete: " + output.firstChild.innerText);
	Global.output.removeChild(output.firstChild);
	Global.dom.shift();
}

//Delete an element on the right;
function DeleteRight() {
	alert("Delete: " + output.lastChild.innerText);
	Global.output.removeChild(output.lastChild);
	Global.dom.pop();
}

//Check and transform the data;
function CheckData() {
	var data = Global.content.value;
	var temp = "";

	for (var i = 0; i < data.length; i++) {
		if (data[i] != ' ' && data[i] != '\n' && data[i] != ',' && data[i] != '，'&& data[i] != '\t' 
			&& data[i] != '、' && data[i] != ';' && data[i] != '；')
			temp += data[i];
		else if (temp != "") {
			Global.queue.push(temp);
			temp = "";
		}
	}
	if (temp != "") Global.queue.push(temp);
}

//The way to delete the clicked elements;
function SelfDelete() {
	Global.output.removeChild(this);
	var that = this;
	Global.dom.forEach(function(item, index) {
		if (item == that) {
			Global.dom.splice(index, 1);
		}
	});
}

//Search the existed information;
function Search() {
	Global.dom.forEach(function(item) {
		item.className = item.className.replace("search-result", "");
	});
	var keyword_value = Global.keyword.value;
	if (keyword_value == "") return;
	Global.dom.forEach(function(item, index) {
		var dom_content = item.innerText;
		console.log(dom_content);
		if (dom_content.indexOf(keyword_value) != -1) {
			item.className += " search-result";
			console.log("in");
		}
	});
}