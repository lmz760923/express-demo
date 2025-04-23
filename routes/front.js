const express = require('express');
const router = express.Router();
const fs=require('fs');
const path=require('path');
const fetch_db=require('../service/getdata').fetch_db;
const multer=require('multer');
const upload=multer({dest:'uploads/'});
var carousel=[];
var categories=[];
var about;
var about_content;
var flowme;
var flowme_content;
var company;
var icp;
var isp;
var address;
var email;

router.get('/',async function(req, res) {
    carousel=await fetch_db('select * from carousel');
    categories=await fetch_db('select * from categories');
    about=await fetch_db('select content from options where name="about"');
    about=about[0].content;
    about_content=await fetch_db('select content from options where name="about_content"');
    about_content=about_content[0].content;
    flowme=await fetch_db('select content from options where name="flowme"');
    flowme=flowme[0].content;
    flowme_content=await fetch_db('select content from options where name="flowme_content"');
    flowme_content=flowme_content[0].content;
    company=await fetch_db('select content from options where name="company"');
    company=company[0].content;
    icp=await fetch_db('select content from options where name="icp"');
    icp=icp[0].content;
    isp=await fetch_db('select content from options where name="isp"');
    isp=isp[0].content;
    address=await fetch_db('select content from options where name="address"');
    address=address[0].content;
    email=await fetch_db('select content from options where name="email"');
    email=email[0].content;
    res.render('layui/front/index',{carousel,categories,about,about_content,flowme,flowme_content,company,icp,isp,address,email});

    
  });

  router.get('/products/:id',(req,res)=>{
	
    res.render('layui/front/products',{cateid:req.params.id});
  });

  router.get('/productdetail/:id',async (req,res)=>{
    let results=await fetch_db('select * from products where category=?',[req.params.id]);
    res.json(
      {
          code:0,
          msg:'success',
          count:results.length,
          totalRow:{},
    data:results
      }
  );

  });

  router.get('/productandservice',async (req,res)=>{
    carousel=await fetch_db('select * from carousel');
    categories=await fetch_db('select * from categories');
    about=await fetch_db('select content from options where name="about"');
    about=about[0].content;
    about_content=await fetch_db('select content from options where name="about_content"');
    about_content=about_content[0].content;
    flowme=await fetch_db('select content from options where name="flowme"');
    flowme=flowme[0].content;
    flowme_content=await fetch_db('select content from options where name="flowme_content"');
    flowme_content=flowme_content[0].content;
    company=await fetch_db('select content from options where name="company"');
    company=company[0].content;
    icp=await fetch_db('select content from options where name="icp"');
    icp=icp[0].content;
    isp=await fetch_db('select content from options where name="isp"');
    isp=isp[0].content;
    address=await fetch_db('select content from options where name="address"');
    address=address[0].content;
    email=await fetch_db('select content from options where name="email"');
    email=email[0].content;
    res.render('layui/front/productandservice',{carousel,categories,about,about_content,flowme,flowme_content,company,icp,isp,address,email});

  });

  router.get('/news',async (req,res)=>{
    carousel=await fetch_db('select * from carousel');
    categories=await fetch_db('select * from categories');
    about=await fetch_db('select content from options where name="about"');
    about=about[0].content;
    about_content=await fetch_db('select content from options where name="about_content"');
    about_content=about_content[0].content;
    flowme=await fetch_db('select content from options where name="flowme"');
    flowme=flowme[0].content;
    flowme_content=await fetch_db('select content from options where name="flowme_content"');
    flowme_content=flowme_content[0].content;
    company=await fetch_db('select content from options where name="company"');
    company=company[0].content;
    icp=await fetch_db('select content from options where name="icp"');
    icp=icp[0].content;
    isp=await fetch_db('select content from options where name="isp"');
    isp=isp[0].content;
    address=await fetch_db('select content from options where name="address"');
    address=address[0].content;
    email=await fetch_db('select content from options where name="email"');
    email=email[0].content;
    news=await fetch_db('select content from options where name="news"');
    news=news[0].content;
    newsitems=await fetch_db('select * from news order by name');
    
    res.render('layui/front/news.ejs',{carousel,categories,about,about_content,flowme,flowme_content,company,icp,isp,address,email,news,newsitems});

  });

  router.get('/contacts',async (req,res)=>{
    carousel=await fetch_db('select * from carousel');
    categories=await fetch_db('select * from categories');
    about=await fetch_db('select content from options where name="about"');
    about=about[0].content;
    about_content=await fetch_db('select content from options where name="about_content"');
    about_content=about_content[0].content;
    flowme=await fetch_db('select content from options where name="flowme"');
    flowme=flowme[0].content;
    flowme_content=await fetch_db('select content from options where name="flowme_content"');
    flowme_content=flowme_content[0].content;
    company=await fetch_db('select content from options where name="company"');
    company=company[0].content;
    icp=await fetch_db('select content from options where name="icp"');
    icp=icp[0].content;
    isp=await fetch_db('select content from options where name="isp"');
    isp=isp[0].content;
    address=await fetch_db('select content from options where name="address"');
    address=address[0].content;
    email=await fetch_db('select content from options where name="email"');
    email=email[0].content;
    res.render('layui/front/contacts.ejs',{carousel,categories,about,about_content,flowme,flowme_content,company,icp,isp,address,email});

  });
  
  router.post('/contact_me',upload.none(),async (req,res)=>{
	  let {name,email,message}=req.body;
    let ret=await fetch_db('insert into contacts(name,email,content,created_date) values(?,?,?,now())',[name,email,message]);
    res.json({message:'感谢您的留言，我们将尽快答复您'});
  });

module.exports=router;