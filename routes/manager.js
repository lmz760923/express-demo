const express = require('express');
const router = express.Router();
const fs=require('fs');
const path=require('path');
const db=require('../dao/db');
const { fileLoader } = require('ejs');
const multer=require('multer');

const uploadDir=path.join(__dirname+'/../','uploads');
if (!fs.existsSync(uploadDir)){fs.mkdirSync(uploadDir,{recursive:true})}

const storage=multer.diskStorage(
  {
	destination:(req,file,cb)=>{cb(null,uploadDir);},
	filename:(req,file,cb)=>{
	  const encodeName=Buffer.from(file.originalname,'latin1').toString('utf8');
	  const uniqueSuffix=Date.now()+'_'+Math.round(Math.random()*1e9);
	  const ext=path.extname(encodeName);
	  const filename=`${uniqueSuffix}${ext}`;
	  cb(null,filename);
	  
	},
  }
);

const fileFilter=(req,file,cb)=>{
	const allowedTypes=/jpeg|jpg|png|gif|mp4/;
	const ext=allowedTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType=allowedTypes.test(file.mimeType);
	/*if (ext && mimeType){cb(null,true);}
	else {cb(new Error('allow uploads (jpeg/jpg/png/gif/mp4)'),false);}*/
	cb(null,true);
  };

const upload=multer({
  storage,
  fileFilter,
  limits:{fileSize:5*1024*1024},
});

const storage_mymp4=multer.diskStorage(
  {
	destination:(req,file,cb)=>{cb(null,uploadDir);},
	filename:(req,file,cb)=>{
	  const encodeName=Buffer.from(file.originalname,'latin1').toString('utf8');
	  const uniqueSuffix=Date.now()+'_'+Math.round(Math.random()*1e9);
	  const ext=path.extname(encodeName);
	  const filename=`my${ext}`;
	  cb(null,filename);
	  
	},
  }
);

const upload_mymp4=multer({
  storage:storage_mymp4,
  fileFilter,
  limits:{fileSize:50*1024*1024},
});

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
	res.json({msg:'success'});
});

router.get('/users',(req,res,next)=>{
	if (req.session.user) {next();}
	else {
		res.status(401).json({message:'未登录'});
	}
},function(req,res){
	res.render('layui/manage/userlist');
})

router.get('/userlist',function(req,res){
	// 执行查询
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

router.get('/carousel',(req,res,next)=>{
	if (req.session.user) {next();}
	else {
		res.status(401).json({message:'未登录'});
	}
},(req,res)=>{
	res.render('layui/manage/carousel');
});

router.get('/carousellist',(req,res)=>{
	db.query('select * from carousel',(err,results,fields)=>{
		res.json(
			{code:'0',
			 msg:'success',
			 count:results.length,
			 totalRow:{},
			 data:results
			 }
			);
	});
	
});

router.post('/carouseldel',(req,res)=>{
	db.query('select * from carousel where id=?',[req.body.carouselid],(err,results,fields)=>{
		if (!err){
		fs.unlink(`${__dirname}/../uploads/${results[0].href}`,(err)=>{
			if (!err){
				db.query('delete from carousel where id=?',[req.body.carouselid],(err,results,fields)=>{
					res.json({msg:results});
				});
			}
		});
	}
	});
	
});

router.get('/categories',(req,res,next)=>{
	if (req.session.user) {next();}
	else {
		res.status(401).json({message:'未登录'});
	}
},(req,res)=>{
	res.render('layui/manage/categories');
});

router.get('/categorylist',(req,res)=>{
	db.query('select * from categories',(err,results,fields)=>{
		res.json(
			{code:'0',
			 msg:'success',
			 count:results.length,
			 totalRow:{},
			 data:results
			 }
			);
	});
});

router.post('/categorydel',(req,res)=>{
	db.query('select * from categories where id=?',[req.body.categoryid],(err,results,fields)=>{
		if (!err){
		fs.unlink(`${__dirname}/../uploads/${results[0].href}`,(err)=>{
			if (!err){
				db.query('delete from categories where id=?',[req.body.categoryid],(err,results,fields)=>{
					res.json({msg:results});
				});
			}
		});
	}
	});
	
});

router.get('/products',(req,res,next)=>{
	if (req.session.user) {next();}
	else {
		res.status(401).json({message:'未登录'});
	}
},(req,res)=>{
	db.query('select * from categories',(err,results,fields)=>{
		let categories=results;
		res.render('layui/manage/products',{categories});
	});
	
});

router.get('/productlist',(req,res)=>{
	db.query('select * from products',(err,results,fields)=>{
		res.json(
			{code:'0',
			 msg:'success',
			 count:results.length,
			 totalRow:{},
			 data:results
			 }
			);
	});
});

router.post('/productdel',(req,res)=>{
	db.query('select * from products where id=?',[req.body.productid],(err,results,fields)=>{
		if (!err){
		fs.unlink(`${__dirname}/../uploads/${results[0].href}`,(err)=>{
			if (!err){
				db.query('delete from products where id=?',[req.body.productid],(err,results,fields)=>{
					res.json({msg:results});
				});
			}
		});
	}
	});
	
});

router.get('/content',(req,res,next)=>{
	if (req.session.user) {next();}
	else {
		res.status(401).json({message:'未登录'});
	}
},(req,res)=>{
	res.render('layui/manage/content');
});

router.get('/contentlist',(req,res)=>{
	db.query('select * from options',(err,results,fields)=>{
		res.json(
			{code:'0',
			 msg:'success',
			 count:results.length,
			 totalRow:{},
			 data:results
			 }
			);
	});
});

router.post('/editcontent',(req,res)=>{
db.query('update options set content=? ,updated_at=now() where id=?',[req.body.content,req.body.contentid],(err,results)=>{
	if (!err){
		res.json({msg:'更新成功'});
	}
	else {res.json({msg:err});}
});
});

router.post('/uploadvideo',upload_mymp4.single('file'),(req,res)=>{
	res.json({msg:req.file});
});


router.post('/addcarousel',upload.single('file'),(req,res)=>{

	db.query('insert into carousel(file,href,created_at,updated_at) values(?,?,now(),now())',[Buffer.from(req.file.originalname,'latin1').toString('utf8'),req.file.filename],(err,results)=>{
		  
	});
	  res.json({
		  message: 'uploaded success',
		  file:{
			  url: `/uploads/${req.file.filename}`,
			  name: Buffer.from(req.file.originalname,'latin1').toString('utf8'),
			  size:req.file.size,
		  }
	  }
	  );
  });
  
  router.post('/addcategory',upload.single('file'),(req,res)=>{
	db.query('insert into categories(file,href,created_at,updated_at,category,description) values(?,?,now(),now(),?,?)',[Buffer.from(req.file.originalname,'latin1').toString('utf8'),req.file.filename,req.body.category,req.body.description],(err,results)=>{
		  
	});
	  res.json({
		  message: 'uploaded success',
		  file:{
			  url: `/uploads/${req.file.filename}`,
			  name: Buffer.from(req.file.originalname,'latin1').toString('utf8'),
			  size:req.file.size,
		  }
	  }
	  );
  });
  
  router.post('/addproduct',upload.single('file'),(req,res)=>{
	db.query('insert into products(file,href,created_at,updated_at,category,description,product) values(?,?,now(),now(),?,?,?)',[Buffer.from(req.file.originalname,'latin1').toString('utf8'),req.file.filename,req.body.category,req.body.description,req.body.product],(err,results)=>{
		  if (err){console.log(err);}
	});
	  res.json({
		  message: 'uploaded success',
		  file:{
			  url: `/uploads/${req.file.filename}`,
			  name: Buffer.from(req.file.originalname,'latin1').toString('utf8'),
			  size:req.file.size,
		  }
	  }
	  );
  });
  
  router.post('/addcontent',upload.none(),(req,res)=>{
	  db.query('insert into options(created_at,updated_at,name,content) values(now(),now(),?,?)',[req.body.name,req.body.content],(err,results,fields)=>{
		  if (!err){
		  res.json({msg:results});
		  }
		  else {res.json({msg:err});}
	  });
  });

module.exports = router;