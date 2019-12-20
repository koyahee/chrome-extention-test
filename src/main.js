(function(){
	
//	window.resizeTo (630,500);
	
//	document.write("<script type='text/javascript' src='CharWideNarrow.js'></script>");

var checkCount;


textClear = function () {
//	alert("clear");
	outputText.value = "";
	inputText.value = "";
	setStart();
	updateTextInfo();
}
	
setStart = function() {
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
	updateTextInfo();
}
	
WideNarrowChanged = function() {
	setStart();
	checkChecked();
}

UniqueChanged = function() {
	setStart();
	checkChecked();
}

SortChanged = function() {
	setStart();
	checkChecked();
}

joinOptionChanged = function() {
	setStart();
	checkChecked();
}
	
splitOptionChanged = function() {
	setStart();
//	checkChecked();
}
	
inputOptionChanged = function() {
	setStart();
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
	
	setStart();
}
	

copyToClipboard = function () {
	copy(outputText.value);
}

pasteFromClipboard = function () {
	paste();
}
	
once = function () {
	pasteFromClipboard();
	setStart();
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
		detailButton.value="詳細設定　▽";
	} else {
		settingTbl.style.visibility="";
		settingTbl.style.display="";
		detailButton.value="詳細設定　△";
	}
}
	
presetYJ = function () {
	setPreset("356","0","12346");
}

presetDrugName = function () {
	setPreset("1234567","1","1346");
}
	
presetSort = function () {
	setPreset("3","-1","126");
}

presetList = function () {
	setPreset("1267","1","6");
}

presetSp2Tab = function () {
	setPreset("68","1","5");
}

presetNW = function () {
	setPreset("69ace","1","");
}

setPreset = function (iOption,wn,oOption) {
	
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
		setStart();
	}

	
}

updateTextInfo = function() {
	
//	alert(outputText.value.split("\r\n").length)
	if(outputText.value.length > 0) {
		infoText.innerHTML = "　リスト件数： " + outputText.value.split("\r\n").length
		sendStatus(null, "件数： " + outputText.value.split("\r\n").length);
	} else {
//		infoText.innerHTML = "　リスト件数： " + 0;
		infoText.innerHTML = ""
		sendStatus(null, "");
	}
//	infoText.innerHTML = "　リスト件数： " + if(outputText.value.length > 0) {outputText.value.split("\r\n").length} else {0};
//	sendStatus(null, "件数： " + outputText.value.split("\r\n").length);
	
}


sendStatus = function (param1 , param2 , param3 ) {
	
	var statusBar = window.parent.document.getElementById("StatusBar");
	
	if(statusBar) {
		if(param1 != null) statusBar.Panels(1).Text = param1
		if(param2 != null) statusBar.Panels(2).Text = param2
		if(param3 != null) statusBar.Panels(3).Text = param3
	}

}

resize = function (width, height) {
	window.resizeTo (width,height)
	alert("changed" + width +", "+height)
}





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
	
	detailButton = document.getElementById('detailButton');



	document.getElementById('startButton').addEventListener('click', setStart);
	
	
	document.getElementById('clearButton').addEventListener('click', textClear);
	
	
	document.getElementById('pasteButton').addEventListener('click', pasteFromClipboard);
	document.getElementById('onceButton').addEventListener('click', once);
	document.getElementById('copyButton').addEventListener('click', copyToClipboard);
	
	
	
	document.getElementById('presetButton1').addEventListener('click', presetYJ);
	document.getElementById('presetButton2').addEventListener('click', presetDrugName);
	document.getElementById('presetButton3').addEventListener('click', presetSort);
	document.getElementById('presetButton4').addEventListener('click', presetList);
	document.getElementById('presetButton5').addEventListener('click', presetSp2Tab);
	document.getElementById('presetButton6').addEventListener('click', presetNW);
	document.getElementById('detailButton').addEventListener('click', displaySetting);
		
	document.getElementById('testButton').addEventListener('click', lsTest);
	
	
	
	
	
	
	
});


lsTest = function () {
	alert(localStorage.getItem("key"));
	localStorage.setItem("key", "aaa");
}

// Write Javascript code!
const copy = function () {
	navigator.clipboard.writeText(document.getElementById('outputText').value)
	.then(function () {
		console.log('copied to clipboard');
	}, function () {
		console.log('failed to copy');
	});
};


const paste = function () {
	navigator.clipboard.readText()
	.then(function (text) {
	  document.getElementById('inputText').textContent = text;
	}, function () {
	  console.log('failed to paste');
	});
};

}())
