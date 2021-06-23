const express=require('express')
const bodyparser=require('body-parser')
const multer=require('multer')
const path=require('path')
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

app.listen(5000,function(){
    console.log("running on port 5000")
})