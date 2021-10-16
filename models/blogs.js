const mongoose=require('mongoose')
const mongo = require('mongodb'); //สำหรับ ver เก่า
const dbUrl = 'mongodb://localhost:27017/BlogDB' //ที่อยู่


mongoose.connect(dbUrl,{  //เชื่อมต่อUrl
    useNewUrlParser:true
})

const db = mongoose.connection //ใช้งานการเชื่อมต่อ
const Schema = mongoose.Schema

const blogSchema = new Schema({  //กำหนดสิ่งที่จะเก็บ
    id:{
        type:Schema.Types.ObjectId  //ประเภท ID
    },
    title:{
        type:String,   
        required:true   //ไม่ให้ว่าง
    },
    author:{
        type:String,   
        required:true   //ไม่ให้ว่าง
    },
    category:{
        type:String,   
        required:true   //ไม่ให้ว่าง
    }
})
const Blogs = module.exports=mongoose.model("blogs",blogSchema) //เชื่อมต่อ และ ใช้โครงสร้าง

// สร้างโมดูลฟังก์ชันในการบันทึกข้อมูล
module.exports.createBlog=function(newBlogs,callback){
    newBlogs.save(callback)
}

// สร้างโมดูลฟังก์ชันในการแสดงข้อมูล
module.exports.getAllBlogs=function(data){
    Blogs.find(data)
}

// สร้างโมดูลฟังก์ชันในการลบข้อมูล
module.exports.deleteBlog=function(id,callback){
    Blogs.findByIdAndDelete(id,callback)
}

// สร้างโมดูลฟังก์ชันในการ ส่งค่าข้อมูล เพื่อใช้สำหัรบอัพเดต
module.exports.getBlogId=function(id,callback){
     var query = {
        _id:id
    }
    Blogs.findOne(query,callback)  //ใช้แบบนี้ก็ได้
    //Blogs.findOne({_id:id},callback) // {_id:id} id ที่ส่งมา
}


// สร้างโมดูลฟังก์ชันในการ อัพเดตข้อมูล
module.exports.updateBlog=function(data,callback){ // data ข้อมูลที่ส่งมาทำงาน
    var query = {
        _id:data.id
    }
    Blogs.findByIdAndUpdate(query,{  //ระบุค่าที่จะอัพเดต
        $set:{      
            title:data.title,
            author:data.author,
            category:data.category
        }
    },{new:true},callback)
}
