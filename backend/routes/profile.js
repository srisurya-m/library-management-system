const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchUser");
const nodemailer=require("nodemailer");

const sendmail=(req,subject,text)=>{
  let config={
    service:"gmail",
    auth:{
      user:process.env.USER_EMAIL,
      pass:process.env.USER_EMAIL_PASS
    }
  }
  let transporter=nodemailer.createTransport(config);
  let message={
    from:"library365366@gmail.com",
    to:req.body.email,
    subject:subject,
    text: text.replace("${req.body.name}", req.body.name)

  }
  transporter.sendMail(message)
}

// ROUTE 1:change in user role : PUT "/api/profile/changerole/:id". --admin
router.put(
    "/changerole/:id",fetchuser,
    async (req, res) => {
      let success=false;
      //if there are errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
        if(req.user.role !== "admin"){
          success=false;
            return res.status(400).json({ msg:"You are not authorized to do this task!" });
        }
        success=true;
        let user = await User.findByIdAndUpdate(
            req.params.id,
            {role:req.body.role},
            {new:true},
        );
        res.status(200).json({success,msg:`role has been changed to ${user.role}`,user})
      } catch (error) {
        console.error(err.message);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 2:update in user details : PUT "/api/profile/updatedetails/:id".
router.put(
    "/updatedetails/:id",fetchuser,
    async (req, res) => {
      let success=false;
      //if there are errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        let user = await User.findByIdAndUpdate(
            req.params.id,
            {name:req.body.name,
            email:req.body.email,
            password:secPass},
            {new:true},
        );
        success=true;
        res.status(200).json({success,msg:`details has been changed!`,user})
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 3:forgot password in user details : PUT "/api/profile/forgotpassword".
router.put(
    "/forgotpassword",
    async (req, res) => {
      let success=false;
      //if there are errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
        success=true;
        let user = await User.findOne({email:req.body.email});
        if(!user){
          return res.status(400).json({msg:"User not found!"});
        }
      const salt = await bcrypt.genSalt(10);
      const secnewPass = await bcrypt.hash(req.body.newPassword, salt);
        user.password=secnewPass;
        user.save();
        sendmail(req,process.env.SUBJECT_FORGOTPASSWORD,process.env.TEXT_FORGOTPASSWORD);
        res.json({success,user});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );


// ROUTE 4:get all user details : GET "/api/profile/userdetails".--admin
router.get(
    "/userdetails",fetchuser,
    async (req, res) => {
      let success=false;
      //if there are errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
        success=true;
        let usersdetail = await User.find().select("-password");
        if(!usersdetail){
          success=false
          return res.status(400).json({success,msg:"Users not found!"});
        }
        if(req.user.role !== "admin"){
          success=false
          return res.json({success,msg:"you are not authorized to this task!"});
        }
        success=true
        res.json({success,usersdetail});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 5:Delete user  : DELETE "/api/profile/deleteuser".--admin
router.delete(
    "/deleteuser/:id",fetchuser,
    async (req, res) => {
      let success=false;
      //if there are errors,return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,errors: errors.array() });
      }
      try {
        if(req.user.role !== "admin"){
          success=false
          return res.json({success,msg:"you are not authorized to this task!"});
        }
        let user=await User.findByIdAndDelete(req.params.id)
        success=true
        res.json({success,msg:"User deleted successfully!"});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );


module.exports = router;