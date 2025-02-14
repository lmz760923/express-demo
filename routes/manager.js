var express = require('express');
var router = express.Router();

var db=require('../dao/db');
/* GET manager listing. */
router.get('/index', function(req, res) {
  res.render('layui/manage/index');
});

router.get('/login', function(req, res) {
  res.render('layui/manage/login');
});

router.post('/login', function(req, res) {
  req.session.user='lmz';
  res.json({ message: 'Hello, World!', timestamp: new Date() });
});

router.post('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/');
});

router.get('/users',function(req,res){
	res.render('layui/manage/userlist');
})

router.get('/userlist',function(req,res){
	// 执行查询
	db.query('SELECT * FROM users', (err, results, fields) => {
	if (err) {
	console.error('Error executing query:', err);
	return;
	}
	console.log('Query results:', results);
	});
	res.json(
	{code:'0',
	 msg:'success',
	 count:1,
	 totalRow:{checkin:1,era:{tang:1,song:0,xian:0}},
	 data:[{id:1001,name:'lmz',password:'password',email:'lmz@163.com',email_verified_at:'',remember_token:'',created_at:'2025-01-01 16:01:01',updated_at:''}]
	 }
	);
})

module.exports = router;