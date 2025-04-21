const db=require('../dao/db');
async function fetch_db(sql,params) {
    return new Promise(function(resolve,reject){
        db.query(sql,params,(err,results)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

module.exports={fetch_db}