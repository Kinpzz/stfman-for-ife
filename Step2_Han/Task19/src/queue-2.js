
// namespace ;
var Global = {}

//Onload the Js;
window.onload = function() {
	Global.init = new Array(22, 55, 33, 44, 66, 77, 88, 55, 100);
	Global.number = document.getElementById("number");
	Global.output = document.getElementById("output");
	Global.queue = new Array();

	var buttons = new Array();
	buttons[0] = document.getElementById("AddLf");
	buttons[1] = document.getElementById("AddRi");
	buttons[2] = document.getElementById("DeleteLf");
	buttons[3] = document.getElementById("DeleteRi");
	buttons[4] = document.getElementById("Sort");

	//Add lintener to each Buttons;
	for (var i = 0; i < 5; i++) {
		if (buttons[i].id == "AddLf") buttons[i].addEventListener("click", AddLeft);
		else if (buttons[i].id == "AddRi") buttons[i].addEventListener("click", AddRight);
		else if (buttons[i].id == "DeleteLf") buttons[i].addEventListener("click", DeleteLeft);
		else if (buttons[i].id == "DeleteRi") buttons[i].addEventListener("click", DeleteRight);
		else if (buttons[i].id == "Sort") buttons[i].addEventListener("click", Sort);
	}

	//Init;
	Init();
}

//Add an element to the left;
function AddLeft() {
	if (!CheckData()) return;
	var newElement = document.createElement("div");
	Global.queue.unshift(newElement);
	newElement.className += "output";
	newElement.style.height = Global.number.value + "px";
	newElement.style.left = parseInt(Global.queue[1].style.left) - 17 + "px";
	newElement.style.marginTop = 100 - Global.number.value + "px";
	if (parseInt(Global.queue[1].style.left) < 0)
		FixPosition(0);
	newElement.addEventListener("click", SelfDelete);
	var firstchild = Global.output.firstChild;
	Global.output.insertBefore(newElement, firstchild);
}

//Add an element to the right;
function AddRight() {
	if (!CheckData()) return;
	var newElement = document.createElement("div");
	Global.queue.push(newElement);
	newElement.className += "output";
	newElement.style.height = Global.number.value + "px";
	newElement.style.left = parseInt(Global.queue[Global.queue.length - 2].style.left) + 17 + "px";
	newElement.style.marginTop = 100 - Global.number.value + "px";
	newElement.addEventListener("click", SelfDelete);
	Global.output.appendChild(newElement);
}

//Delete an element on the left;
function DeleteLeft() {
	alert("Delete: " + parseInt(output.firstChild.style.height));
	output.removeChild(output.firstChild);
}

//Delete an element on the right;
function DeleteRight() {
	alert("Delete: " + parseInt(output.lastChild.style.height));
	output.removeChild(output.lastChild);
}

//Check whether the data is a number;
function CheckData() {
	//Check whether overflow;
	if (Global.queue.length > 60) {
		alert("The number of elements can not be more than 60!");
		return false;
	}
	var data = Global.number.value;
	if (!/^[0-9]*$/.test(data) || data == "" || data < 10 || data > 100) {
		alert("Please input a number ranging from 10 to 100!");
		return false;
	}
	return true;
}

//The way to delete the clicked elements;
function SelfDelete() {
	//console.log(this.style.height);
	var temp = this.nextSibling;
	alert("Delete: " + parseInt(this.style.height));
	output.removeChild(this);
	if (temp) FixPosition(temp);
}

//Sort the datas;
function Sort() {
		var i = 0, j = 0;
		var timer_in = setInterval(function() {

			if(j != 0 && !(i == Global.queue.length - 2 && j == Global.queue.length - i - 1))
					Global.queue[j-1].style.backgroundColor = "#EDEDF8";

			if (j >= Global.queue.length - i - 1) {
				i++;
				j = 0;
				if (i >= Global.queue.length - 1)
					clearInterval(timer_in);
				return;
			}

			Global.queue[j].style.backgroundColor = "#e74f4d";
			Global.queue[j+1].style.backgroundColor = "#e74f4d";

			setTimeout(function() {
				if (parseInt(Global.queue[j].style.height) > parseInt(Global.queue[j + 1].style.height)) {
					Swap(j, j+1);
				}
				j++;
			}, 500);

		}, 1500);
}

//Create some elements when open the website;
function Init() {
	var obj, frame = document.createDocumentFragment();
	for (var i = 0; i < Global.init.length; i++) {

		obj = document.createElement("div");
		obj.className += "output";
		obj.style.height = Global.init[i] + "px";
		obj.style.left = i * 17 + "px";
		obj.style.marginTop = 100 - Global.init[i] + "px";
		obj.addEventListener("click", SelfDelete);

		Global.queue[i] = obj;
		frame.appendChild(obj);
	}
	Global.output.appendChild(frame);
}

//Swap the position of the elements; then store in the Global;
function Swap(a, b) {

	var temp_pos = Global.queue[a].style.left;
	Global.queue[a].style.left = Global.queue[b].style.left;
	Global.queue[b].style.left = temp_pos;

	var temp = Global.queue[a];
	Global.queue[a] = Global.queue[b];
	Global.queue[b] = temp;

}

//Fix the position when delete the elements;
function FixPosition(startPoint) {
	if (isNaN(startPoint)) {
		startPoint.style.left = parseInt(startPoint.style.left) - 17 + "px";
		while (startPoint.nextSibling) {
			startPoint = startPoint.nextSibling;
			startPoint.style.left = parseInt(startPoint.style.left) - 17 + "px";
		}
		return;
	}

	for (var i = startPoint; i < Global.queue.length; i++)
		Global.queue[i].style.left = parseInt(Global.queue[i].style.left) + 17 + "px";
}
