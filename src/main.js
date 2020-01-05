(function(){
	
//	window.resizeTo (630,500);
	
//	document.write("<script type='text/javascript' src='CharWideNarrow.js'></script>");

var presetObj;

var checkCount;

replaceMessage = function () {
	
	_replaceMessage("splitOption1")
	_replaceMessage("splitOption2")
	_replaceMessage("splitOption3")
	_replaceMessage("splitOption4")
	_replaceMessage("splitOption5")
	_replaceMessage("splitOption6")

	_replaceMessage("inputOption1")
	_replaceMessage("inputOption2")
	_replaceMessage("inputOption3")
	_replaceMessage("inputOption4")
	_replaceMessage("inputOption5")
	_replaceMessage("inputOption6")
	_replaceMessage("inputOption7")
	_replaceMessage("inputOption8")

	_replaceMessage("narrowOption")
	_replaceMessage("wideOption")
	_replaceMessage("wnOption")
	_replaceMessage("uniqueOption")
	_replaceMessage("sortOption")
	_replaceMessage("joinOption1")
	_replaceMessage("joinOption2")
	_replaceMessage("joinOption3")
	_replaceMessage("joinOption4")
	_replaceMessage("allOption")
	_replaceMessage("joinOptionT")
	
	_replaceMessage("conversionButton")
	_replaceMessage("clearButton")
	_replaceMessage("pasteButton")
	_replaceMessage("onceButton")
	_replaceMessage("copyButton")
	
}


_replaceMessage = function (id) {
	
	var element = document.getElementById(id)
	
	if(element.className == "message") {
		element.value = chrome.i18n.getMessage(id);
	} else {
	
		var parents = element.parentNode.childNodes;
		
		for (let i=0; i<parents.length; i++) {
			if(parents[i].className == "message") {
				parents[i].innerHTML = chrome.i18n.getMessage(id);
			}
		}
	}
}

textClear = function () {
//	alert("clear");
	outputText.value = "";
	inputText.value = "";
	replaceText();
}
	
replaceText = function() {
	var cwn = new CharWideNarrow();
	var tmpList = inputText.value;
	
	if(wideOption.checked) {
		tmpList = cwn.ToWideAll(tmpList,1);
		tmpList = tmpList.replace(/　+\r\n/g, "\r\n");
	} else if (narrowOption.checked) {
		tmpList = cwn.ToNarrowASCII(tmpList);
		tmpList = tmpList.replace(/ +\r\n/g, "\r\n");
	}
	
	if(inputOption1.checked) {
		tmpList = tmpList.replace(/"/g, "");//"
	}
	
	var arr
	
	var strSplit = ""
	
	if(splitOption1.checked) {
		if (strSplit == "") {
			strSplit = "､|、"
		} else {
			strSplit = strSplit + "|､|、";
		}
	}
	
	if(splitOption2.checked) {
		if (strSplit == "") {
			strSplit = "\t"
		} else {
			strSplit = strSplit + "|\t";
		}
	}
	
	if(splitOption3.checked) {
		if (strSplit == "") {
			strSplit = "\r\n|\r|\n"
		} else {
			strSplit = strSplit + "|\r\n|\r|\n";
		}
	}
	
	if(splitOption4.checked) {
		if (strSplit == "") {
			strSplit = "/|／"
		} else {
			strSplit = strSplit + "|/|／";
		}
	}
	
	if(splitOption5.checked) {
		if (strSplit == "") {
			strSplit = ",|，"
		} else {
			strSplit = strSplit + "|,|，";
		}
	}
	
	if(splitOption6.checked) {
		if (strSplit == "") {
			strSplit = " |　"
		} else {
			strSplit = strSplit + "| |　";
		}
	}
	
	
	if (strSplit == "") {
		arr = tmpList.split();
	} else {
		arr = tmpList.split(new RegExp(strSplit));
	}
	
	if(inputOption2.checked) {//前後の空白除去
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /(^\s+)|^　+|　+&\$|(\s+$)/g , "");
		}
		
	}
	
	if(inputOption3.checked) {//空白除去
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /[\s　]/g , "");
		}
		
	}
	
	if(inputOption4.checked) {//句読点，→、
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /，/g , "、");
		}
		
	}
	
	if(inputOption5.checked) {//句読点、→，
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /、/g , "，");
		}
		
	}
	
	if(inputOption6.checked) {//句読点．→。
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /．/g , "。");
		}
		
	}
	
	if(inputOption7.checked) {//句読点。→．
		
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( /。/g , "．");
		}
		
	}
	
	var toText = ''
	var fromText = ''
	if(inputOption8.checked) {//任意の文字列→任意の文字列
		
		fromText = inputOption8A.value;
		
		fromText = fromText.replace(/\\/g, "\\\\");
		
		if(fromText.match(/\[/)) {
			
			fromText = fromText.replace(/\[/g,"\\\[")
			fromText = fromText.replace(/\]/g,"\\\]")
			
			
			if(fromText.match(/\\\[([^]]+)\\\]/)) {
				fromText = fromText.replace(/\\\[([^]]+)\\\]/g,"\[$1\]")
			}
			
		}
		
		fromText = fromText.replace(/\\t/g, "\t");
		fromText = fromText.replace(/\\r/g, "\r");
		fromText = fromText.replace(/\\n/g, "\n");
		fromText = fromText.replace(/\\s/g, "\s");
		
//		fromText = fromText.replace(/\\$/g, "\\\\");//\の処理
//		fromText = fromText.replace(/\\\]/g, "\\\\");//\の処理
		
		toText = inputOption8B.value;
		
		toText = toText.replace(/\\/g, "\\\\");
		
		toText = toText.replace(/\\t/g, "\t");
		toText = toText.replace(/\\r/g, "\r");
		toText = toText.replace(/\\n/g, "\n");
		toText = toText.replace(/\\s/g, "\s");
		
//		toText = toText.replace(/\\$/g, "\\\\");//\の処理
//		toText = toText.replace(/\\\]/g, "\\\\");//\の処理
		for(var i = 0; i <arr.length; i++) {
			arr[i] = arr[i].replace( new RegExp(fromText, 'g') , toText);
		}
		
	}
	
	if(uniqueOption.checked) {
		arr = unique(arr)
	}
	
	if(sortOption.checked) {
		
		arr = arr.sort();
		
		/*
		arr = arr.sort( function( a, b ) {
			return a - b;
		} );
		*/
	}
	
	var join1 = ''
	if(joinOption1.checked) {
		join1 = '\'';
	}
	var join2 = ''
	if(joinOption2.checked) {
		join2 = ',';
	}
	
	var join3 = ''
	if(joinOption3.checked) {
		join3 = '\t';
	}
	
	var join4 = ''
	if(joinOption4.checked) {
		join4 = '\n';
	}
	
	
	var joinText = ''
	if(joinOptionT.checked) {		
		joinText = joinOptionTi.value;
		joinText = joinText.replace(/\\t/g, "\t");
		joinText = joinText.replace(/\\r/g, "\r");
		joinText = joinText.replace(/\\n/g, "\n");
	}
	
	var out = join1 + arr.join(join1 + join2 + joinText + join3 + join4 + join1) + join1;
	outputText.value = out;
	/*
	var datalength = arr.length;
	
	for(var i=0; i<datalength;i++) {
		outputText.value = outputText.value + '\'' + cwn.ToNarrowAll(arr[i]) + '\'\n';
	}
	*/
	outputText.value = outputText.value.replace(/''/g, "")
}

valueChanged = function() {
	replaceText();
	checkChecked();
}


checkChecked = function() {
	checkCount = 0
	if(sortOption.checked) {
		checkCount++;
	}
	if(uniqueOption.checked) {
		checkCount++;
	}
	if(joinOption1.checked) {
		checkCount++;
	}
	if(joinOption2.checked) {
		checkCount++;
	}
	if(joinOption3.checked) {
		checkCount++;
	}
	if(checkCount == 5) {
		allOption.checked = true;
	} else {
		allOption.checked = false;
	}
}

allOptionChanged = function() {
	sortOption.checked=allOption.checked;
	uniqueOption.checked=allOption.checked;
	joinOption1.checked=allOption.checked;
	joinOption2.checked=allOption.checked;
	joinOption3.checked=allOption.checked;
	joinOption4.checked=allOption.checked;
	
	replaceText();
}

oneClick = function () {
	pasteFromClipboard();
	replaceText();
	copyToClipboard();
}

var unique = function (array) {
var storage = {};
var uniqueArray = [];
var i,value;
	if(typeof(array) == "undefined") {
		uniqueArray = array;
	} else {
for ( i=0; i<array.length; i++) {
		 value = array[i];
			if (!(value in storage)) {
			 storage[value] = true;
		 uniqueArray.push(value);
			 }
		 }
	}
		 return uniqueArray;
}

displaySetting = function() {
	if(settingTbl.style.visibility=="") {
		settingTbl.style.visibility="hidden";
		settingTbl.style.display="none";
		confButton.value="設定 ▽";
		window.resizeTo(930, 500);
		
	} else {
		settingTbl.style.visibility="";
		settingTbl.style.display="";
		confButton.value="設定 △";
	}
	
	resizeWindow();
}

presetAdd = function () {
	alert("+");
	
	setOption();
}

getOption  = function () {

	var pName = presetName.value;
	var iOption = "";
	var wn = -1;
	var oOption = "";
	
	if(splitOption1.checked) { iOption = iOption + "1";}
	if(splitOption2.checked) { iOption = iOption + "2";}
	if(splitOption3.checked) { iOption = iOption + "3";}
	if(splitOption4.checked) { iOption = iOption + "4";}
	if(inputOption1.checked) { iOption = iOption + "5";}
	if(inputOption2.checked) { iOption = iOption + "6";}
	if(splitOption5.checked) { iOption = iOption + "7";}
	if(splitOption6.checked) { iOption = iOption + "8";}
	if(inputOption3.checked) { iOption = iOption + "9";}
	if(inputOption4.checked) { iOption = iOption + "a";}
	if(inputOption5.checked) { iOption = iOption + "b";}
	if(inputOption6.checked) { iOption = iOption + "c";}
	if(inputOption7.checked) { iOption = iOption + "d";}
	if(inputOption8.checked) { iOption = iOption + "e";}
	
	if(narrowOption.checked) { wn = 0;}
	if(wideOption.checked) { wn = 1;}
	if(wnOption.checked) { wn = -1;}
	
	if(uniqueOption.checked) { oOption = oOption + "1";}
	if(sortOption.checked) { oOption = oOption + "2";}
	if(joinOption1.checked) { oOption = oOption + "3";}
	if(joinOption2.checked) { oOption = oOption + "4";}
	if(joinOption3.checked) { oOption = oOption + "5";}
	if(joinOption4.checked) { oOption = oOption + "6";}
	if(joinOptionT.checked) { oOption = oOption + "7";}
	
	if(allOption.checked) { oOption = oOption + "a";}
	
	return {pName:pName, iOption:iOption ,wn: wn, oOption: oOption};

}


setOption = function (optionObj = {}) {
	
	var pName = ("pName" in optionObj) ? optionObj.pName : "";
	var iOption = ("iOption" in optionObj) ? optionObj.iOption : "";
	var wn = ("wn" in optionObj) ? optionObj.wn : "";
	var oOption = ("oOption" in optionObj) ? optionObj.oOption : "";
	
	presetName.value = pName;
	
	if(String(iOption).match(1)) {
		splitOption1.checked = "checked"//「、」で分割
	} else {
		splitOption1.checked = ""
	}
	if(String(iOption).match(2)) {
		splitOption2.checked = "checked"//「TAB」で分割
	} else {
		splitOption2.checked = ""
	}
	if(String(iOption).match(3)) {
		splitOption3.checked = "checked"//「改行」で分割
	} else {
		splitOption3.checked = ""
	}
	if(String(iOption).match(4)) {
		splitOption4.checked = "checked"//「／」で分割
	} else {
		splitOption4.checked = ""
	}
	if(String(iOption).match(5)) {
		inputOption1.checked = "checked"//「”」の除去
	} else {
		inputOption1.checked = ""
	}
	if(String(iOption).match(6)) {
		inputOption2.checked = "checked"//前後の空白の除去
	} else {
		inputOption2.checked = ""
	}
	if(String(iOption).match(7)) {
		splitOption5.checked = "checked"//「，」で分割
	} else {
		splitOption5.checked = ""
	}
	if(String(iOption).match(8)) {
		splitOption6.checked = "checked"//「　」で分割
	} else {
		splitOption6.checked = ""
	}
	
	if(String(iOption).match(9)) {
		inputOption3.checked = "checked"//空白の除去
	} else {
		inputOption3.checked = ""
	}
	
	if(String(iOption).match('a')) {
		inputOption4.checked = "checked"//，→、
	} else {
		inputOption4.checked = ""
	}
	
	if(String(iOption).match('b')) {
		inputOption5.checked = "checked"//、→，
	} else {
		inputOption5.checked = ""
	}
	
	if(String(iOption).match('c')) {
		inputOption6.checked = "checked"//．→。
	} else {
		inputOption6.checked = ""
	}
	
	if(String(iOption).match('d')) {
		inputOption7.checked = "checked"//。→．
	} else {
		inputOption7.checked = ""
	}

	if(String(iOption).match('e')) {
		inputOption8.checked = "checked"//「任意の文字列」→「任意の文字列」
	} else {
		inputOption8.checked = ""
	}
	
	if(wn == 0) {
		narrowOption.checked = "checked"//半角
	} else if (wn == 1) {
		wideOption.checked = "checked"//全角
	} else {
		wnOption.checked = "checked"//そのまま
	}

	if(String(oOption).match(1)) {
		uniqueOption.checked = "checked"//重複削除
	} else {
		uniqueOption.checked = ""
	}
	if(String(oOption).match(2)) {
		sortOption.checked = "checked"//ソート
	} else {
		sortOption.checked = ""
	}
	if(String(oOption).match(3)) {
		joinOption1.checked = "checked"//「'」でくくる
	} else {
		joinOption1.checked = ""
	}
	if(String(oOption).match(4)) {
		joinOption2.checked = "checked"//「,」で区切る
	} else {
		joinOption2.checked = ""
	}
	if(String(oOption).match(5)) {
		joinOption3.checked = "checked"//「TAB」で区切る
	} else {
		joinOption3.checked = ""
	}
	if(String(oOption).match(6)) {
		joinOption4.checked = "checked"//改行
	} else {
		joinOption4.checked = ""
	}
	if(String(oOption).match(7)) {
		joinOptionT.checked = "checked"//「任意の文字列」で区切る
	} else {
		joinOptionT.checked = ""
	}
	if(String(oOption).match("a")) {
		allOption.checked = "checked"
		allOptionChanged();
	} else if(String(oOption).match("n")) {
		allOption.checked = ""
		allOptionChanged();
	} else {
		replaceText();
	}

	
}


resize = function (width, height) {
	window.resizeTo (width,height)
	alert("changed" + width +", "+height)
}


document.addEventListener('click', function(e) {

	switch (e.target.name) {
		
		case "option":
			valueChanged();
			break;
			
		default:
			break;
			
	}
	
	switch (e.target.id) {
		
		case "conversionButton":
			replaceText();
			break;
	
		case "clearButton":
			textClear();
			break;
	
	
		case "pasteButton":
			pasteFromClipboard();
			break;
	
		case "onceButton":
			oneClick();
			break;
	
		case "copyButton":
			copyToClipboard();
			break;
	
	
		case "testButton":
			lsTest();
			break;
	
	
		case "confButton":
			displaySetting();
			break;
			
			
		case "presetButton0":
			presetAdd();
			break;
			
			
		case "presetButton1":
			setOption({iOption:"356" ,wn: "0", oOption: "12346"});
			break;
			
		case "presetButton2":
			setOption({iOption:"1234567" ,wn: "1", oOption: "1346"});
			break;
			
		case "presetButton3":
			setOption({iOption:"3" ,wn: "-1", oOption: "126"});
			break;
			
		case "presetButton4":
			setOption({iOption:"1267" ,wn: "1", oOption: "6"});
			break;
			
		case "presetButton5":
			setOption({iOption:"68" ,wn: "1", oOption: "5"});
			break;
			
		case "presetButton6":
			setOption({iOption:"69ace" ,wn: "1", oOption: ""});
			break;
			
			
		case "allOption":
			allOptionChanged();
			break;
			
			
		case "saveButton":
			savePresets();
			break;
			
		case "resetButton":
			loadPresets();
			break;
			
		case "deleteButton":
			break;
			
		case "loadButton":
			loadPresets();
			break;
			
		default:
			break;
	}

});

document.addEventListener('onkeyup', function(e) {
//	console.log(e.target.id);
	
	switch (e.target.id) {
	
		case "inputOption8A":
			valueChanged();
			break;
			
		case "inputOption8B":
			valueChanged();
			break;
			
		case "joinOptionTi":
			valueChanged();
			break;
			
		default:
			break;
	
	}

});

document.addEventListener('onchange', function(e) {
//	console.log(e.target.id);
	
	switch (e.target.id) {
	
		case "inputOption8A":
			valueChanged();
			break;
			
		case "inputOption8B":
			valueChanged();
			break;
			
		case "joinOptionTi":
			valueChanged();
			break;
			
		default:
			break;
	
	}

});


document.addEventListener('DOMContentLoaded', function() {

	outputText = document.getElementById('outputText');
	inputText = document.getElementById('inputText');
	
	wideOption = document.getElementById('wideOption');
	narrowOption = document.getElementById('narrowOption');
	wnOption = document.getElementById('wnOption');
	
	sortOption = document.getElementById('sortOption');
	uniqueOption = document.getElementById('uniqueOption');
	
	joinOption1 = document.getElementById('joinOption1');
	joinOption2 = document.getElementById('joinOption2');
	joinOption3 = document.getElementById('joinOption3');
	joinOption4 = document.getElementById('joinOption4');
	joinOptionT = document.getElementById('joinOptionT');
	joinOptionTi = document.getElementById('joinOptionTi');
	
	splitOption1 = document.getElementById('splitOption1');
	splitOption2 = document.getElementById('splitOption2');
	splitOption3 = document.getElementById('splitOption3');
	splitOption4 = document.getElementById('splitOption4');
	splitOption5 = document.getElementById('splitOption5');
	splitOption6 = document.getElementById('splitOption6');
	
	inputOption1 = document.getElementById('inputOption1');
	inputOption2 = document.getElementById('inputOption2');
	inputOption3 = document.getElementById('inputOption3');
	inputOption4 = document.getElementById('inputOption4');
	inputOption5 = document.getElementById('inputOption5');
	inputOption6 = document.getElementById('inputOption6');
	inputOption7 = document.getElementById('inputOption7');
	inputOption8 = document.getElementById('inputOption8');
	inputOption8A = document.getElementById('inputOption8A');
	inputOption8B = document.getElementById('inputOption8B');
	
	allOption = document.getElementById('allOption');
	
	countText = document.getElementById('countText');
	
	settingTbl = document.getElementById('settingTable');
	
	presetName = document.getElementById('presetName');
	
	confButton = document.getElementById('confButton');

	replaceMessage();
	window.resizeTo(930, 500);
});

var queue = null, // キューをストック 
wait = 300; // 0.3秒後に実行の場合 
 
window.addEventListener( 'resize', function() {
// イベント発生の都度、キューをキャンセル 
clearTimeout( queue );
 
// waitで指定したミリ秒後に所定の処理を実行 
// 経過前に再度イベントが発生した場合
// キューをキャンセルして再カウント 
queue = setTimeout(function() {
// リサイズ時に行う処理 
resizeWindow();
}, wait );
}, false );

resizeWindow = function () {
//	window.resizeTo(930, 500);
	window.resizeTo(930, document.documentElement.clientHeight + window.outerHeight - window.innerHeight);
}


savePresets = function () {
	alert(JSON.stringify(getOption()));
	localStorage.options = JSON.stringify(getOption());
}

loadPresets = function () {
	alert(localStorage.options);
	setOption(JSON.parse(localStorage.options));
}

lsTest = function () {

	alert(getOption());

/*
	alert(window.innerHeight);
	alert(window.outerHeight);
	alert(document.body.clientHeight);
	alert(document.documentElement.clientHeight);
	
	alert(window.innerWidth);
	alert(window.outerWidth);
	alert(document.body.clientWidth);
	alert(document.documentElement.clientWidth);
*/
//	window.resizeTo(930, 500);
//	window.resizeTo(930, document.documentElement.clientHeight + window.outerHeight - window.innerHeight);
	
//	alert(localStorage.getItem("key"));
//	localStorage.setItem("key", "aaa");
}

// Write Javascript code!
const copyToClipboard = function () {
	navigator.clipboard.writeText(document.getElementById('outputText').value)
	.then(function () {
		console.log('copied to clipboard');
	}, function () {
		console.log('failed to copy');
	});
};


const pasteFromClipboard = function () {
	navigator.clipboard.readText()
	.then(function (text) {
		document.getElementById('inputText').textContent = text;
		console.log('pasted from clipboard');
	}, function () {
		console.log('failed to paste');
	});
};

}())
