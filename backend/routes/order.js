const express = require("express");
const order=require("../models/order");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const nodemailer=require("nodemailer");

const sendmail=(req,subject,text)=>{
    var date = new Date();
    let num=Math.floor(Math.random() * (11) + 3);
    date.setDate(date.getDate() + num);
    let config={
      service:"gmail",
      auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_EMAIL_PASS
      }
    }
    let transporter=nodemailer.createTransport(config);
    let message={
      from:process.env.USER_EMAIL,
      to:req.user.email,
      subject:subject,
      text:text.replace("${req.body.name}", req.body.name).replaceAll("[Book Title]",req.body.title).replace("[Author's Name]",req.body.author).replace("[Expected Arrival Date]",date),
  
    }
    transporter.sendMail(message)
  }

const sendmailspecial=async (req,subject,text)=>{
    let orderdetails=await order.findById(req.params.id);
    let config={
      service:"gmail",
      auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_EMAIL_PASS
      }
    }
    let transporter=nodemailer.createTransport(config);
    let message={
      from:process.env.USER_EMAIL,
      to:orderdetails.email,
      subject:subject,
      text:text.replace("${req.body.name}", orderdetails.name).replaceAll("[Book Title]",orderdetails.title).replace("[Author's Name]",orderdetails.author),
  
    }
    transporter.sendMail(message)
  }

// ROUTE 1:place order for a book using : POST "/api/order/placeorder".
router.post(
    "/placeorder", fetchuser,
    [
      body("title"),
      body("author"),
      body("name"),
      body("email").isEmail(),

    ],
    async (req, res) => {
      let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success,errors: errors.array() });
    }
      try {
        let placedorder= await order.findOne({user_id:req.user.id});
        if(placedorder){
          success=false;
            return res.json({success,msg:"You can only place order once!"});
        }
        if(req.body.email !== req.user.email){
          success=false;
            return res.json({success,msg:"pls order with your credentials!"});
        }
          success=true;
        const neworder= await order.create({
            name:req.body.name,
            email:req.body.email,
            title:req.body.title,
            author:req.body.author,
            user_id: req.user.id,
        });
        sendmail(req,process.env.SUBJECT_PLACEORDER,process.env.TEXT_PLACEORDER);
        res.json({success,msg:"order placed successfully!",neworder});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 2:order recieved for a book using : DELETE "/api/order/recieveorder". --admin
router.delete(
    "/recieveorder/:id", fetchuser,
    async (req, res) => {
      let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      try {
        if(req.user.role !== "admin"){
          res.status(400).json({success,msg:"you are not authorized to this task!"})
        }
        success=true;
        sendmailspecial(req,process.env.SUBJECT_RECIEVEORDER,process.env.TEXT_RECIEVEORDER);
        let recieveduser= await order.findByIdAndDelete(req.params.id);
        res.json({success,msg:"order recieved successfully, you can apply for your next order!"});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 3:myorder for a book using : GET "/api/order/myorder". 
router.get(
    "/myorder", fetchuser,
    async (req, res) => {
      let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({success,errors: errors.array() });
    }
      try {
        success=true;
        let myorder= await order.find({user_id:req.user.id});
        res.json({success,myorder});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 4:all orders a book using : GET "/api/order/allorders". --admin
router.get(
    "/allorders", fetchuser,
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
          res.status(400).json({success,msg:"you are not authorized to this task!"});
        }
        success=true;
        let allorders= await order.find();
        res.json({success,allorders});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

module.exports=router;

