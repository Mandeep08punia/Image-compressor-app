const express=require('express')
const bodyparser=require('body-parser')
const multer=require('multer')
const path=require('path')
const app=express();

app.set('view engine','ejs');
app.use('/uploads',express.static(path.join(__dirname+'/uploads')))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

app.listen(5000,function(){
    console.log("running on port 5000")
})