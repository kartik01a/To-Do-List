const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lists = require('./schema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/listDB');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));


app.get("/",function(req,res){
    lists.find({},function(err,foundItems){
        if(err) console.log(err);
        else{
            res.render("index",{newItem:foundItems});
        }
    })
})
app.post("/",function(req,res){
    const data = req.body.dolist;
    const list1 = new lists({list:data});
    list1.save();
    res.redirect("/");
})
app.post("/delete",function(req,res){
    const deleteId = req.body.checkboxid;
    lists.findByIdAndDelete(deleteId,function(err){
        if(err) console.log(err);
    });
    res.redirect("/");
})



app.listen(3000,function(){
    console.log("Server started !!");
})