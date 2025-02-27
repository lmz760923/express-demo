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
router.get('/index', function(req, res) {
    db.query('select * from carousel',(err,results)=>{
        carousel=results;
        db.query('select * from categories',(err,results)=>{
            categories=results;
            db.query('select * from options where name="about"',(err,results)=>{
                about=results[0].content;
                db.query('select * from options where name="about_content"',(err,results)=>{
                    about_content=results[0].content;
                    db.query('select * from options where name="flowme"',(err,results)=>{
                        flowme=results[0].content;
                        db.query('select * from options where name="flowme_content"',(err,results)=>{
                            flowme_content=results[0].content;
                            db.query('select * from options where name="company"',(err,results)=>{
                                company=results[0].content;
                                
                                res.render('layui/front/index',{carousel,categories,about,about_content,flowme,flowme_content,company});
                            });
                            
                        });
                        
                    });
                    
                });
                
            });
            
        });
        
    });
    
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