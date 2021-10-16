var express = require('express');
var router = express.Router();
const Blogs = require('../models/blogs');
const { check, validationResult } = require('express-validator'); //ต้องลง npm ก่อน


// req = สิ่งที่ขอ , res = ตอบกลับ

router.get('/', function(req, res, next) {
    Blogs.getAllBlogs(function(err,blogs){//เรีกใช้งาน models ฟังก์ชันgetAllBlogs ที่สร้างไว้โดยส่ง เก็บค่าที่ค้นหาไว้ใน blogs ที่ส่งกลับมา ไปทำงาน
        if(err) throw err
        res.render("blogs/index",{data:"ข้อมูลบทความ", blogs:blogs}); //เรียกใช้ views ส่งข้อมูลไป
    });
    
  });

router.get('/add', function(req, res, next) {
    res.render("blogs/addForm",{data:"เพิ่มบทความ"}); //เรียกใช้ views
});

router.get('/delete/:id', function(req, res, next) { //ส่งค่า id ไปด้วยในการลบ
    console.log("FIND ID ",req.params.id); 
    Blogs.deleteBlog([req.params.id],function(err){// params 
        if(err) throw err
        res.redirect("/blogs");
        console.log("DELETE COMPLETE");
    });
});

router.get('/edit/:id', function(req, res, next) {
    console.log(req.params.id); 
    Blogs.getBlogId([req.params.id],function(err,blog){  // เรียกใช้ฟังก์ชั่น ส่ง id ไปเพื่อหา ข้อมูลชุดidนั้น
        if(err) throw err
        res.render("blogs/editForm",{data:"แก้ไขบทความ",blog:blog}); //เรียกใช้ views แล้วส่งค่าที่ค้นหาได้ไป
    });
    
});

router.post('/add',[
    check('title','กรุณาใส่ชื่อบทความ').not().isEmpty(),   //check ว่าค่าว่างหรือเปล่า ถ้าว่างให้แจ้งเตือน
    check('author','กรุณาใส่ชื่อผู้เขียน').not().isEmpty()
    
], function(req, res, next) {
    //ส่งค่าแจ้งเตือน
    const result = validationResult(req);
    var errors = result.errors;
    for(var key in errors){
        console.log(errors[key].value);
    }
    if (!result.isEmpty()){ // ถ้าพบค่าว่าง
        //ส่งค่าไปยัง views เมื่อป้อนข้อมูลไม่ครบ
        res.render("blogs/addForm",{data:"เพิ่มบทความใหม่อีกครั้ง",errors:errors});
    }else{ 
        // ส่วนบันทึกข้อมูล
        data= new Blogs({
        title:req.body.title,
        author:req.body.author,
        category:req.body.category
    })
    Blogs.createBlog(data, function(err,callback){  //เรีกใช้งาน models ฟังก์ชัน createBlog ที่สร้างไว้โดยส่ง data ไปทำงาน
        if(err) console.log(err);
        res.redirect("/blogs") //หลังจากเพิ่มแล้วให้เปลี่ยนไปหน้า
    });
    }
});


router.post('/update',[
    check('title','กรุณาใส่ชื่อบทความ').not().isEmpty(),   //check ว่าค่าว่างหรือเปล่า ถ้าว่างให้แจ้งเตือน
    check('author','กรุณาใส่ชื่อผู้เขียน').not().isEmpty()
    
], function(req, res, next) {
    //ส่งค่าแจ้งเตือน
    const result = validationResult(req);
    var errors = result.errors;
    for(var key in errors){
        console.log(errors[key].value);
    }
    if (!result.isEmpty()){ // ถ้าพบค่าว่าง
        //เมื่อป้อนข้อมูลไม่ครบกลับหน้า
        res.redirect("blogs/");
    }else{ 
        // ส่วนที่จะอัพเดตข้อมูล
        data= new Blogs({
        id:req.body.id,
        title:req.body.title,
        author:req.body.author,
        category:req.body.category
    })
    Blogs.updateBlog(data, function(err,callback){  //เรีกใช้งาน models ฟังก์ชัน createBlog ที่สร้างไว้โดยส่ง data ไปทำงาน
        if(err) console.log(err);
        res.redirect("/blogs") //หลังจากเพิ่มแล้วให้เปลี่ยนไปหน้า
    });
    }
    
    
});
  
  module.exports = router;