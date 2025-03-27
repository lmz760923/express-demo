import http from 'http';
import url from 'url';
import fs from 'fs/promises';
import path from 'path';
class StaticServer{
    constructor(options){
        this.port=options.port||8080;
        this.rootDir=options.rootDir||process.cwd();
        this.server=http.createServer(this.handleRequest.bind(this));

    }

    handleRequest(req,res){
        const baseURL =  req.protocol + '://' + req.headers.host + '/';
        const reqUrl = new url.URL(req.url,baseURL);
        
        console.log('urlobj:',reqUrl)
        const pathname=reqUrl.pathname
        
        let filePath=path.join(this.rootDir,pathname)
        if (filePath===path.join(this.rootDir,'/')){
            filePath=path.join(this.rootDir,'/index.html')
            
        }
        console.log('filepath:',filePath)
        this.sendFile(filePath,res)
    }
    async sendFile(filePath,res){
        try{
            const fileContent=await fs.readFile(filePath)
            const contentType='text/html'
            res.setHeader('Content-Type',contentType)
            console.log(fileContent.toString('utf-8'))
            res.end(fileContent);
        }catch(error){
            if (error.code==='ENOENT'){res.statusCode=404;res.end('file not found');}
            else {res.statusCode=500;res.end('error');console.log(error);}
        }
    }
    start(){
        this.server.listen(this.port,()=>{console.log(`server at :${this.port}`);console.log(`server files from :${this.rootDir}`);})
    }
}
export default StaticServer