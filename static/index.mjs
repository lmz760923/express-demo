import Server from './static.mjs';
const server=new Server({port:8080,rootDir:process.cwd()})
server.start();