const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
const fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET; //this is a secret which u shouldn't share.
const sendmail= async (req,subject,text)=>{
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
    to: req.body.email,
    subject: subject,
    text: text.replace("${req.body.name}", req.body.name)

  }
  transporter.sendMail(message)
}

// ROUTE 1:create a user using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success,error: errors.array() });
    }
    try {
      //check wether the user(email) exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=false;
        return res.json({ success,error: "Sorry a user with this credentials already exits!" });
      }
      success=true;
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        role:req.body.role,
      });
      const data = {
        user: {
          id: user.id,
          role: user.role,
          email:user.email,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      sendmail(req,process.env.SUBJECT_CREATE_USER,process.env.TEXT_CREATE_USER);
      res.json({success,authtoken });
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

//ROUTE 2: authenticate a user using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.json({ success,error: "please try to login with correct credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.json({ success,error: "please try to login with correct credentials!" });
      }
      const data = {
        user: {
          id: user.id,
          role: user.role,
          email:user.email,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      await sendmail(req,process.env.SUBJECT_LOGIN,process.env.TEXT_LOGIN);
      res.json({success,user,authtoken });
    } catch (error) {
      console.error(err.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);


//protected user route auth
router.get("/user-auth",fetchuser,(req,res)=>{
  if(req.user){
    return res.status(200).json({ok:"true"});
  }
})

//protected admin route auth
router.get("/admin-auth",fetchuser,(req,res)=>{
  if(req.user.role === "admin"){
    return res.status(200).json({ok:"true"});
  }
})

module.exports = router;