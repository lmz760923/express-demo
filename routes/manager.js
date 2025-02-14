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
	var mydata;
	db.query('SELECT * FROM users', (err, results, fields) => {
	if (err) {
	console.error('Error executing query:', err);
	return;
	}
		 
	res.json(
	{code:'0',
	 msg:'success',
	 count:results.length,
	 totalRow:{checkin:1,era:{tang:1,song:0,xian:0}},
	 data:results
	 }
	);
	
	
	
	});


})

router.post('/adduser',function(req,res){
	db.query('insert into users(name,email,password) values(?,?,?)',[req.body.username,req.body.email,req.body.reg_password], (err, results) => {
	if (err) {
	console.error('Error executing query:', err);
	return;
	}
	
	});
	res.json({msg:1});
});

router.post('/userdel',(req,res)=>{
	db.query('delete from users where id=?',[req.body.userid],(err,results)=>{
		if (err) {
			console.error('Error executing query:',err);
			return;
		}
	res.json({msg:results});
	});
});

router.get('/carousel',(req,res)=>{
	res.render('layui/manage/carousel');
});

module.exports = router;