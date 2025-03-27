const express = require('express');
const router = express.Router();
const fs=require('fs');
const path=require('path');
const db=require('../dao/db');
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

async function fetch_db(sql) {
    return new Promise(function(resolve,reject){
        db.query(sql,(err,results)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

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
    res.render('layui/front/index',{carousel,categories,about,about_content,flowme,flowme_content,company,icp,isp,address});

    
  });

  router.get('/products/:id',(req,res)=>{
	
    res.render('layui/front/products',{cateid:req.params.id});
  });

  router.get('/productdetail/:id',(req,res)=>{
    db.query('select * from products where category=?',[req.params.id],(err,results)=>{
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
  });
module.exports=router;