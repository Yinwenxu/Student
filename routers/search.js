var express = require('express');

var StuModel = require('../models/StuModel');

var app = express();


app.get('/search',function (req,res) {
    var stuname = req.query.stuname;
    StuModel.find({stuname:{$regex:stuname}}).populate('banji','name  lesson').exec(function (err,students) {
        if(err){
            return res.json({
                error:1,
                msg:'数据库错误'
            })
        }
        if(students.length == 0){
            return res.json({
                error:0,
                msg:'没有该学生'
            })
        }
        res.render('search',{
            students
        })
    })

})
module.exports =app;