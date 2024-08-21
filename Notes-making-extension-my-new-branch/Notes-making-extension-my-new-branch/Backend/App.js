const express=require('express');
const app=express();
const fs=require('fs');
const cors=require('cors');

app.use(cors({origin:"*"}))
app.use(express.json());
const path=__dirname+"/Folderoffile";
app.get('/',(req,resp)=>{
const filelist=fs.readdirSync(path);
console.log(filelist);
      resp.send({allfile:filelist})
})



app.post('/createfile',(req,resp)=>{
      console.log(req.body);
      var {filename}=req.body;
      console.log("filen name",filename);
      filename=`./Folderoffile/`+filename+'.txt';
      
      fs.appendFile(filename,`Date of file creation: ${new Date(Date.now())} \n\n `, function (err) {
            if (err) throw err;
            console.log('file created of name ',filename);
      });
      resp.send({message:"this is backend"})
})

app.put('/addheading',(req,resp)=>{
      var {filename,text}=req.body;
      filename=`./Folderoffile/`+filename;
      console.log("the file name : ",filename);
      text= `#). `+text+`+\n \n`
      console.log("text data ",text);
      fs.appendFile(filename,text , function (err) {
            if (err) throw err;
            console.log("new point added ",filename );
      });
      resp.status(200).send({
            success:true,
            "message":"heading added "
      });
})
app.put('/addbullet',(req,resp)=>{
      var {filename,text}=req.body;
      filename=`./Folderoffile/`+filename;
      console.log("the file name : ",filename);
      text= `         =>.  `+text+`+\n \n`
      console.log("text data ",text);
      fs.appendFile(filename,text , function (err) {
            if (err) throw err;
            console.log("new point added ",filename );
      });
      resp.status(200).send({
            success:true,
            "message":"bullet added"
      });
})


app.listen(3001,(error)=>{
      if(!error){
            console.log("port started at 3001");
      }
      else{
            console.log("some error occured in port connection",error.message);
      }
})