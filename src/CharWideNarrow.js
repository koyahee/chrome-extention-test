/*

ToNarrowAll(str)　　　　　　　　　　変換可能な全角文字を、半角に変換（英数字記号、およびカタカナ）
ToNarrowASCII(str)　　　　　　　　全角英数字記号を、半角に変換
ToNarrowKANA(str) 　　　　　　　全角カタカナを、半角に変換
ToWideAll(str,option) 　　　　　　変換可能な半角文字を、全角に変換（英数字記号、およびカタカナ）
ToWideASCII(str)　　　　　　　　　半角英数字記号を、全角に変換
ToWideKANA(str,option) 　　　　半角カタカナを、全角に変換

*/


// class CharWideNarrow
	var narrowdicASCII = {
		"～": "~" , "｝": "}" , "｜": "|" , "｛": "{" , "ｚ": "z" ,
		"ｙ": "y" , "ｘ": "x" , "ｗ": "w" , "ｖ": "v" , "ｕ": "u" ,
		"ｔ": "t" , "ｓ": "s" , "ｒ": "r" , "ｑ": "q" , "ｐ": "p" ,
		"ｏ": "o" , "ｎ": "n" , "ｍ": "m" , "ｌ": "l" , "ｋ": "k" ,
		"ｊ": "j" , "ｉ": "i" , "ｈ": "h" , "ｇ": "g" , "ｆ": "f" ,
		"ｅ": "e" , "ｄ": "d" , "ｃ": "c" , "ｂ": "b" , "ａ": "a" ,
		"‘": "`" , "＿": "_" , "＾": "^" , "］": "]" , "￥": "\\",
		"［": "[" , "Ｚ": "Z" , "Ｙ": "Y" , "Ｘ": "X" , "Ｗ": "W" ,
		"Ｖ": "V" , "Ｕ": "U" , "Ｔ": "T" , "Ｓ": "S" , "Ｒ": "R" ,
		"Ｑ": "Q" , "Ｐ": "P" , "Ｏ": "O" , "Ｎ": "N" , "Ｍ": "M" ,
		"Ｌ": "L" , "Ｋ": "K" , "Ｊ": "J" , "Ｉ": "I" , "Ｈ": "H" ,
		"Ｇ": "G" , "Ｆ": "F" , "Ｅ": "E" , "Ｄ": "D" , "Ｃ": "C" ,
		"Ｂ": "B" , "Ａ": "A" , "＠": "@" , "？": "?" , "＞": ">" ,
		"＝": "=" , "＜": "<" , "；": ";" , "：": ":" , "９": "9" ,
		"８": "8" , "７": "7" , "６": "6" , "５": "5" , "４": "4" ,
		"３": "3" , "２": "2" , "１": "1" , "０": "0" , "／": "/" ,
		"．": "." , "－": "-" , "，": "," , "＋": "+" , "＊": "*" ,
		"）": ")" , "（": "(" , "’": "'" , "＆": "&" , "％": "%" ,
		"＄": "$" , "＃": "#" , "”": "\"", "！": "!" , "　": " "
	}

	// 逆引き表の作成
	var widedicASCII= new Object();
	for (var keyString in narrowdicASCII) {
		widedicASCII[ narrowdicASCII[keyString] ] = keyString ;
	}

	var narrowdicANK = {
		"゜": "ﾟ" , "゛": "ﾞ" , "ヶ": "ｹ" , "ヵ": "ｶ" , "ヴ": "ｳﾞ",
		"ン": "ﾝ" , "ヲ": "ｦ" , "ヱ": "ｳｪ", "ヰ": "ｳｨ", "ワ": "ﾜ" ,
		"ヮ": "ﾜ" , "ロ": "ﾛ" , "レ": "ﾚ" , "ル": "ﾙ" , "リ": "ﾘ" ,
		"ラ": "ﾗ" , "ヨ": "ﾖ" , "ョ": "ｮ" , "ユ": "ﾕ" , "ュ": "ｭ" ,
		"ヤ": "ﾔ" , "ャ": "ｬ" , "モ": "ﾓ" , "メ": "ﾒ" , "ム": "ﾑ" ,
		"ミ": "ﾐ" , "マ": "ﾏ" , "ポ": "ﾎﾟ", "ボ": "ﾎﾞ", "ホ": "ﾎ" ,
		"ペ": "ﾍﾟ", "ベ": "ﾍﾞ", "ヘ": "ﾍ" , "プ": "ﾌﾟ", "ブ": "ﾌﾞ",
		"フ": "ﾌ" , "ピ": "ﾋﾟ", "ビ": "ﾋﾞ", "ヒ": "ﾋ" , "パ": "ﾊﾟ",
		"バ": "ﾊﾞ", "ハ": "ﾊ" , "ノ": "ﾉ" , "ネ": "ﾈ" , "ヌ": "ﾇ" ,
		"ニ": "ﾆ" , "ナ": "ﾅ" , "ド": "ﾄﾞ", "ト": "ﾄ" , "デ": "ﾃﾞ",
		"テ": "ﾃ" , "ヅ": "ﾂﾞ", "ツ": "ﾂ" , "ッ": "ｯ" , "ヂ": "ﾁﾞ",
		"チ": "ﾁ" , "ダ": "ﾀﾞ", "タ": "ﾀ" , "ゾ": "ｿﾞ", "ソ": "ｿ" ,
		"ゼ": "ｾﾞ", "セ": "ｾ" , "ズ": "ｽﾞ", "ス": "ｽ" , "ジ": "ｼﾞ",
		"シ": "ｼ" , "ザ": "ｻﾞ", "サ": "ｻ" , "ゴ": "ｺﾞ", "コ": "ｺ" ,
		"ゲ": "ｹﾞ", "ケ": "ｹ" , "グ": "ｸﾞ", "ク": "ｸ" , "ギ": "ｷﾞ",
		"キ": "ｷ" , "ガ": "ｶﾞ", "カ": "ｶ" , "オ": "ｵ" , "ォ": "ｫ" ,
		"エ": "ｴ" , "ェ": "ｪ" , "ウ": "ｳ" , "ゥ": "ｩ" , "イ": "ｲ" ,
		"ィ": "ｨ" , "ア": "ｱ" , "ァ": "ｧ" , "ー": "ｰ" , "・": "･" ,
		"、": "､" , "」": "｣" , "「": "｢" , "。": "｡"
	}

	// 逆引き表の作成
	var widedicANK= new Object();
	for (var keyString in narrowdicANK) {
		widedicANK[ narrowdicANK[keyString] ] = keyString ;
	}

var CharWideNarrow = function(){}

CharWideNarrow.prototype.ToNarrowAll = function( str ){
	var rtn ="" ; var char_ ; var trns_ ;

	var max_ = str.length ;
	for (i=0; i < max_ ; i++){
		char_ = str.charAt(i) ;
		if( char_ in narrowdicASCII ){
			trns_ = narrowdicASCII[ char_ ] ;
		} else {
			if( char_ in narrowdicANK ){
				trns_ = narrowdicANK[ char_ ] ;
			} else {
				trns_ = char_ ;
			}
		}
		rtn = rtn + trns_ ;
	}
	return rtn ;
}

CharWideNarrow.prototype.ToNarrowASCII = function( str ){
	var rtn = "" ; var char_ ; var trns_ ;

	var max_ = str.length ;
	for (i=0; i < max_ ; i++){
		char_ = str.charAt(i) ;
		if( char_ in narrowdicASCII ){
			trns_ = narrowdicASCII[ char_ ] ;
		} else {
			trns_ = char_ ;
		}
		rtn = rtn + trns_ ;
	}
	return rtn ;
}

CharWideNarrow.prototype.ToNarrowKANA = function( str ){
	var rtn = "" ; var char_ ; var trns_ ;

	var max_ = str.length ;
	for (i=0; i < max_ ; i++){
		char_ = str.charAt(i) ;
		if( char_ in narrowdicANK ){
			trns_ = narrowdicANK[ char_ ] ;
		} else {
			trns_ = char_ ;
		}
		rtn = rtn + trns_ ;
	}
	return rtn ;
}

CharWideNarrow.prototype.ToWideAll = function( str , option_ ){
	var rtn = "" ; var char_ ; var trns_ ; var next_c ; var flg_nextc_trns = false ; var k ;

	var max_ = str.length ;
	for (i=0; i < max_ ; i++){
		if( flg_nextc_trns ){
			flg_nextc_trns = false ;
		} else {
			char_  = str.charAt(i)  ;
			next_c = str.charAt(i+1);
			switch( next_c ){
				case "ﾟ" :
				case "ﾞ" :
					k = char_ + next_c ;
					if( k in widedicANK ){
						char_ = k ;
						flg_nextc_trns = true  ;
					}
					break ;
				case "ｨ" :
				case "ｪ" :
					if( option_ = true ){
						k = char_ + next_c ;
						if( k in widedicANK ){
							char_ = k ;
							flg_nextc_trns = true ;
						}
					}
					break;
			}
			if (char_ in widedicASCII){
				trns_ = widedicASCII[ char_ ] ;
			} else {
				if(char_ in widedicANK){
					trns_ = widedicANK[ char_ ] ;
				} else {
					trns_ = char_ ;
				}
			}
			rtn = rtn + trns_ ;
		}
	}
	return rtn ;
}

CharWideNarrow.prototype.ToWideASCII = function( str ){
	var rtn = "" ; var char_ ; var trns_ ;

	var max_ = str.length ;
	for (i=0;i < max_ ; i++){
		char_ = str.charAt(i) ;
		if( char_ in widedicASCII ){
			trns_ = widedicASCII[ char_ ] ;
		} else {
			trns_ = char_ ;
		}
		rtn = rtn + trns_ ;
	}
	return rtn ;
}

CharWideNarrow.prototype.ToWideKANA = function( str , option_ ){
	var rtn = "" ; var char_ ; var trns_ ; var next_c ; var flg_nextc_trns = false ; var k ;

	var max_ = str.length ;
	for (i=0 ; i < max_ ; i++ ){
		if( flg_nextc_trns ){
			flg_nextc_trns = false ;
		} else {
			char_  = str.charAt(i)  ;
			next_c = str.charAt(i+1);

			switch( next_c ){
				case "ﾟ" :
				case "ﾞ" :
					k = char_ + next_c ;
					if( k in widedicANK ){
						char_ = k ;
						flg_nextc_trns = true  ;
					}
					break ;
				case "ｨ" :
				case "ｪ" :
					if( option_ = true ){
						k = char_ + next_c ;
						if( k in widedicANK ){
							char_ = k ;
							flg_nextc_trns = true  ;
						}
					}
					break;
			}
			if(char_ in widedicANK){
				trns_ = widedicANK[ char_ ] ;
			} else {
				trns_ = char_ ;
			}
			rtn = rtn + trns_ ;
		}
	}
	return rtn ;
}

// class CharWideNarrow End