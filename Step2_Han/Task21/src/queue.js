/* author : HanYifan
**
**    2016/4/8
*/


// Namespace;
var Global = {}

window.onload = function() {

	if (!String.prototype.trim) {
  		String.prototype.trim = function () {
    	return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  		};
	}		

	Global.tagKey = document.getElementById("tagKey");
	Global.Tags = document.getElementById("Tags");
	Global.tagArray = new Array();

	//tagKey.onkeydown = AutoAddTags;
	//tagKey.onkeyup = ClearTag;

	Global.interestKey = document.getElementById("interestKey");
	Global.Interests = document.getElementById("Interests");
	Global.confirmButton = document.getElementById("confirm");
	Global.interestArray = new Array();

	Global.confirmButton.addEventListener("click", AddInterests);
}


function AutoAddTags(event) {

	var text = Global.tagKey.value;
	if (text == "") return;

	var keycode = event.keyCode || event.which;
	if (keycode == 13 || keycode == 188 || keycode == 32) {

		text.trim();

		text = CheckData(text);
		if (text == null || Global.tagArray.indexOf(text[0]) != -1) return;
		else text = text[0];

		var newTag = document.createElement("div");
		var newContent = document.createTextNode(text);
		newTag.appendChild(newContent);
		newTag.className += " tag";
		newTag.addEventListener("click", SelfDelete);
		newTag.onmouseover = HoverTag;
		newTag.onmouseout = HoverTagEnd;

		if (Global.tagArray.length == 10) {
			Global.Tags.removeChild(Global.Tags.firstChild);
			Global.tagArray.shift();
		}

		Global.Tags.appendChild(newTag);
		Global.tagArray.push(text);
	}
}


function HoverTag() {
	console.log(this.textContent);
	this.textContent = "点击删除" + this.textContent;
}


function HoverTagEnd() {
	this.textContent = this.textContent.replace("点击删除", "");
}


function ClearTag(event) {
	var keycode = event.keyCode || event.which;
	if (keycode == 13 || keycode == 188 || keycode == 32) {
		Global.tagKey.value = "";
	}
}


function AddInterests() {
	var textArray = CheckData(Global.interestKey.value);
	textArray.forEach(function(item) {
		if (Global.interestArray.indexOf(item) != -1) return;

		var newInterest = document.createElement("div");
		var newContent = document.createTextNode(item);
		newInterest.appendChild(newContent);
		newInterest.className += " interest";


		if (Global.interestArray.length == 10) {
			Global.Interests.removeChild(Global.Interests.firstChild);
			Global.interestArray.shift();
		}

		Global.Interests.appendChild(newInterest);
		Global.interestArray.push(item);
	})
}


//Check and transform the data;
function CheckData(data) {
	var temp = "";
	var array = new Array();

	for (var i = 0; i < data.length; i++) {
		if (data[i] != ' ' && data[i] != '\n' && data[i] != ',' && data[i] != '，'&& data[i] != '\t' 
			&& data[i] != '、' && data[i] != ';' && data[i] != '；')
			temp += data[i];
		else if (temp != "") {
			array.push(temp);
			temp = "";
		}
	}
	if (temp != "") array.push(temp);

	switch (array.length) {
		case 0: 
			return null;
		default :
			return array;
	}
}


//The way to delete the clicked elements;
function SelfDelete() {
	Global.tag_size--;
	Global.Tags.removeChild(this);
	var index = Global.tagArray.indexOf(this.textContent);
	Global.tagArray.splice(index, 1);
}

