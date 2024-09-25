const http=require("http");
const fs=require("fs");
const minimist=require("minimist");
const args=minimist(process.argv.slice(2));
const pt=args.port;
let homeconts="";
let regconts="";
let projconts="";



fs.readFile("home.html",(err,home)=>
{
    if(err)
    {
        throw err;
    }
    homeconts=home;
});
fs.readFile("registration.html",(err,reg)=>
{
    if(err)
    {
        throw err;
    }
    regconts=reg;
});
fs.readFile("project.html",(err,proj)=>
{
    if(err)
    {
        throw err;
    }
    projconts=proj;
});


http.createServer((req,res)=>
{
    let url=req.url;
    res.writeHeader(200,{"Content-Type":"text/html"});
    switch(url)
    {
        case "/project":
            res.write(projconts);
            res.end();
            break;
        case "/registration":
            res.write(regconts);
            res.end();
            break;
        case "/":
            res.write(homeconts);
            res.end();
            break;
        default:
            res.write("<h1>404 Not Found</h1>"); 
            res.end();
            break;
    }
}).listen(pt,() =>
{
    console.log("Server created successfully");
});