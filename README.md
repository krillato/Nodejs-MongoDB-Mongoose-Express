# Nodejs-MongoDB-Mongoose-Express

Nodejs , MongoDB & Mongoose , Express
สร้างเว็บ blog => เพิ่ม แสดง ลบ แก้ไข blog ผ่าน form

 * วิธีสร้างโปรเจคและเปิดเซิฟเวอร์
1. npm install express-generator
2. express --view=ejs myblogs  (สร้างโปรเจคชื่อ myblogs)
3. cd myblogs
4. npm install
5. npm start


 * ลง npm เชื่อมต่อ mongaDB
1. npm install mongodb
2. npm install mongoose

 * ลงเพิ่มเติม
1. npm install express-validator  ใช้ตรวจสอบค่าว่างและแจ้งเตือน

 * เพิ่ม routes (link)
1. สร้าง routes 
2. link กับ views
3. require ในหน้า app.js ระบุคำที่ใช้เรียกหน้าให้แสดง ที่ app.use



 * วิธีส่งค่าจาก routes ไปยัง views

 router.get('/', function(req, res, next) {
    res.render("blogs/index",{data:"Hello TeeTime"}); //เรียกใช้ views และส่งค่า data ไป
  }); 

  เรียกใช้ในหน้า views โดย
  =>  ใช้คำสั่ง <%= data %>


  * เชื่อมต่อ mongaDB และ เก็บข้อมูล
1. สร้าง models
2. เชื่อมต่อไปยัง mongodb
3. สร้าง Schema (โครงสร้าง)
4. เรียกใช้งานที่ routes

 