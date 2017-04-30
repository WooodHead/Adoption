var express = require('express');
var multer = require('../util/multerUtil');
var db = require('../conf/db');
var common = require('../common');
var router = express.Router();

var upload = multer.array("photos[]", 6);

/* 根目录(首页) */
router.get('/', function(req, res, next) {
  var sql = "SELECT * from cat_info";
  var cats_info = [];
  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    cats_info = rows;
    res.render('index', {
      cats_info: cats_info,
      title: 'Express'
    });
  });
  
});


/* 查看资料详情 */
router.get('/detail_info', function(req, res, next) {
  var id = req.query.id;
  var sql = "SELECT * from cat_info where id="+id;

  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    var cat = rows[0];
    var temp = cat.img_srcs;
    var srcs = temp.split("|");
    res.render('detail_info', {
      cat: cat,
      srcs: srcs
    });
  });
});

/* 上传页面 */
router.get('/upload', function(req, res, next){
  var cat = {};
  res.render('upload', {});
});


/* 上传资料 */
router.post('/saveData',upload, function(req, res, next){
  var imgsArr = req.files;
  var data = req.body;
  var tempImgs = [];
  for(var i=0; i<imgsArr.length; i++){
    tempImgs.push(imgsArr[i].filename);
  }
  var imgUrls = tempImgs.join("|");
  var sql = 'INSERT INTO cat_info ( breed, name, sex, color, age, expelling, vaccinum, sterilization, nature, origin, deposit, remark, img_srcs) VALUES("'+data.breed+'", "'+data.name+'", "'+data.sex+'", "'+data.color+'", "'+data.age+'", "'+data.expelling+'", "'+data.vaccinum+'", "'+data.sterilization+'", "'+data.nature+'", "'+data.origin+'", "'+data.deposit+'", "'+data.remark+'", "'+imgUrls+'");';
  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    res.send({ "data" : rows});
  });
});

module.exports = router;
