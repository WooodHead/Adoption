

var common = {
	//获取页面URL参数
	//入参  str[String] 字符串格式的URL路径，可选，如不提供默认取当前页面URL
	//返回  [object] url参数键值对，key为参数名，value 为参数值
	getUrlParams: function (str) {
		str = decodeURI(str || location.href);
		var idx = str.indexOf('?'), params = {}, ary = [];
		if (idx != -1) {
			str = str.substring(idx + 1, str.length);
			ary = str.split('&');
			for (var i = 0; i < ary.length; i++) {
				var _idx = ary[i].indexOf('=');
				params[ary[i].substring(0, _idx)] = ary[i].substring(_idx + 1, ary[i].length);
			}
		}
		return params;
	},
	alert: function (errorText, flag) {
		$body = window != window.top ? $("body", parent.document) : $("body");
		this.dialog();
		if (KGF.isEmpty(flag) || flag == 'undefined') {
			$body.find("#dialog1").append("<div class='weui_mask'></div>");
			$("#dialog1").show();
			$("#dialog1").css("display", "block");
			$body.find(".weui_mask").after("<div class='weui_dialog'></div>");
			$body.find(".weui_dialog").append("<div class='weui_dialog_bd'>" + errorText + "</div>");
			$body.find(".weui_dialog_bd").after("<div class='weui_dialog_ft'></div>");
			$body.find(".weui_dialog_ft").append("<a href='javascript:;' class='weui_btn_dialog primary cancel'>确定</a>");
		} else {
			var html = '<div class="" id="dialogue2">'
				+ '<div class="mask"></div>'
				+ '<div class="hint tinct_bc">'
				+ '<div class="result">'
				+ '<div class="error"><img src="../../img/error.png"></div>'
				+ '<p class="text-center tinct">' + errorText + '</p>'
				+ '</div>'
				+ '<div class="btnBox2">'
				+ '<div class="col-xs-12 text-right"><a class="btn btn-default btn-lg tinct tinct_bc cancel">确&nbsp;&nbsp;认</a></div>'
				+ '</div>'
				+ '</div>'
				+ '</div>';
			$body.find("#dialog1").append(html);
			$("#dialog1").show();
			$("#dialog1").css("display", "block");
		}
		$(".cancel").click(function () {
			$("#dialog1").remove();
		});
	},
	/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
*/
	randomWord: function (randomFlag, min, max) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	}
}

module.exports = common;