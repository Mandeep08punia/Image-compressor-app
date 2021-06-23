const express=require('express')
const bodyparser=require('body-parser')
const multer=require('multer')
const path=require('path');
const { nextTick } = require('process');
const app=express();

app.set('view engine','ejs');
app.use('/uploads',express.static(path.join(__dirname+'/uploads')))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }

})
const upload=multer({
    storage:storage
})
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/',upload.single('image'),(req,res,next)=>{
    const file=req.file
    let ext;
    if(!file){
        const error=new Error("Please upload a file")
        error.httpStatusCode=404
        return next(error)
    }
    if(file.mimetype=='image/jpeg'){
        ext='jpg'
    }
    if(file.mimetype=='image/png'){
        ext='png'
    }
    res.render('image.ejs',{url:file.path,name:file.filename,ext:ext})
    
})



app.listen(5000,function(){
    console.log("running on port 5000")
})