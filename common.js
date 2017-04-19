

var common = {
  //获取页面URL参数
  //入参  str[String] 字符串格式的URL路径，可选，如不提供默认取当前页面URL
  //返回  [object] url参数键值对，key为参数名，value 为参数值
  getUrlParams: function(str){
    str = decodeURI(str||location.href);
    var idx = str.indexOf('?'),params = {},ary=[];
    if(idx !=-1){
      str = str.substring(idx+1,str.length);
      ary = str.split('&');
      for(var i=0;i<ary.length;i++){
        var _idx = ary[i].indexOf('=');
        params[ary[i].substring(0,_idx)] = ary[i].substring(_idx+1,ary[i].length);
      }
    }
    return params;
  }
}

module.exports = common;