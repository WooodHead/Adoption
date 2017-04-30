var express = require('express');
var common = require('../common');
var db = require('../conf/db');
var cookieParser = require('cookie-parser');
var transporter = require('../util/mailUtil');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', {});
});

router.post('/signin', function (req, res, next) {
  var info = req.body;

  var sql = 'SELECT * FROM users WHERE email="'+info.email+'";';

  db.query(sql, function(err, rows, fields){
    if(err){
      console.log(err);
      return;
    }

    if(info.password == rows[0].password){
      res.setHeader("Set-Cookie", ["email=" + info.email, "word=" + info.password, "logStatus=1"]);
      res.redirect("../");
    }

  })
})

/*
logStatus:
-1-注册未激活
0-未登录
1-已登录
*/

//注册账号
router.post('/signup', function (req, res, next) {
  var info = req.body;
  var code = common.randomWord(true, 15, 30); //激活码
  var email = info.email; //注册邮箱
  var name = info.nickname;

  var activationUrl = 'http://localhost:3000/users/activate?email=' + email + '&code=' + code;
  console.log(info);
  var sql = 'INSERT INTO users ( nickname, email, telephone, password, activation) VALUES("' + name + '", "' + email + '", "' + info.telephone + '", "' + info.password + '", "' + code + '");';

  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err.message);
      return;
    }

    res.setHeader("Set-Cookie", ["email=" + info.email, "word=" + info.password, "logStatus=-1"]);

    var mailOptions = {
      from: '798459906@qq.com',
      to: email,
      subject: '激活您的帐号',
      html: '<div>亲爱的: ' + name + '</div><br /><p>感谢您注册Cutterman帐号，注册的最后一步，请通过下面链接完成帐号验证。即可开始体验Cut君神奇的工具带来的效率提升！</p><p>请<a href="' + activationUrl + '" target=_blank>点击这里</a>完成验证, 如果您无法点击此连接, 请手动拷贝下面链接地址到浏览器中:</p><p>' + activationUrl + '</p><p>如果您还有别的疑问或者不知道怎么办，请联系我:</p><p>新浪微博: @铲屎官Tritty</p><p>QQ号: 798459906</p><p>谢谢！</p>'
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      res.send(rows);
    })
  });
});


//激活账号
router.get('/activate', function (req, res, next) {
  var params = req.query;
  var code = params.code;
  var email = params.email;
  console.log(params);


  var sql1 = 'SELECT * FROM users WHERE email="' + email + '";';

  console.log(sql1);
  db.query(sql1, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send("激活失败！请前往邮箱确认激活链接~");
      return;
    }
    var validCode = rows[0].activation;
    if (rows[0].activation === 1) {
      res.send("您的账号已成功激活，无需重复激活。您可前往登录页面登录您的账号~");
      return;
    } else {
      if (validCode === code) {
        var sql2 = 'update users set active="1" where email="' + email + '";';  //激活成功
        db.query(sql2, function (err, rows, fields) {
          if (err) {
            console.log(err);
            return;
          }
          res.setHeader("Set-Cookie", ["logStatus=0"]);
          res.send("您已成功激活账号，前往登录页面进行登录");
        })
      } else {
        res.send("激活码错误，请前往邮箱确认激活链接~");
      }
    }
  })
})

module.exports = router;
