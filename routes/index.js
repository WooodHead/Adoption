var express = require('express');
var db = require('../conf/db');
var router = express.Router();
var common = require('../common');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * from new_table";
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

router.get('/detail_info', function(req, res, next) {
  var id = req.query.id;
  console.log("输出:"+id);
  var sql = "SELECT * from new_table where cat_id="+id;

  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    var cat = rows;
    console.log(cat[0])
    res.render('detail_info', {
      cat: cat[0]
    });
  });
});

//var cat = {id:"cat1", breed:"中华田园猫", color:"三花", name:"NO1", img_src:"images/cat1.jpg", sex:"公", age:"11个月", vaccinum: "已接种疫苗", expelling:"已驱虫", sterilization:"已绝育", nature:"活泼好动", origin:"救助", deposit: "需要", remark:"破坏力强"};

router.get('/upload', function(req, res, next){
  console.log("输出:");
  var cat = {};
    res.render('upload', {});
});

router.post('/saveData', function(req, res, next){
  var data = req.body;
  var sql = 'INSERT INTO new_table ( breed, name, sex, color, age, expelling, vaccinum, sterilization, nature, origin, deposit, remark) VALUES("'+data.breed+'", "'+data.name+'", "'+data.sex+'", "'+data.color+'", "'+data.age+'", "'+data.expelling+'", "'+data.vaccinum+'", "'+data.sterilization+'", "'+data.nature+'", "'+data.origin+'", "'+data.deposit+'", "'+data.remark+'");'
  console.log(sql);
  db.query(sql, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
  });
});

module.exports = router;
