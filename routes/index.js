var express = require('express');
var db = require('../conf/db');
var router = express.Router();
var common = require('../common');

/* GET home page. */
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



/* goto detail info page */
router.get('/detail_info', function(req, res, next){
  var id = common.getUrlParams().id;
  console.log("输出:"+id);
  var sql = "SELECT * from cat_info where id="+id;
  var cat = {};
  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    cat = rows;
    res.render('detail_info', {
      cat: cat
    });
  });
/*  var cat = {id:"cat1", breed:"中华田园猫", color:"三花", name:"NO1", img_src:"images/cat1.jpg", sex:"公", age:"11个月", vaccinum: "已接种疫苗", expelling:"已驱虫", sterilization:"已绝育", nature:"活泼好动", origin:"救助", deposit: "需要", remark:"破坏力强"};
  res.redirect("/detail_info");*/
});

module.exports = router;
