var multer = require("multer");

var storage = multer.diskStorage({
  //设置文件上传路径
  destination: function(req, file, callback){
    callback(null, "D:/WORK/Adoption/public/dataInfo/img");
  },
  //定义文件名并加上后缀
  filename: function(req, file, callback){
    var fileFmt = file.originalname.split('.');
    var timeStamp = (new Date()).getTime();
    var fileName = fileFmt[0]+'_'+timeStamp+'.'+fileFmt[fileFmt.length-1];
    callback(null, fileName);
  }
});

//添加配置文件到multer对象
var upload = multer({ storage: storage});



//导出对象
module.exports = upload;