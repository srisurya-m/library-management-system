const express = require("express");
const book = require("../models/book");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchUser");
const nodemailer=require("nodemailer");
const issue = require("../models/issue");

const sendmail=async (req,subject,text,issuedate,returndate)=>{
  let issuedbook= await book.findById(req.params.id);
  let issuedbookowner= await issue.findOne({book_id:req.params.id}).populate('user_id');
  let owneremail= issuedbookowner.user_id.email;
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
    to: owneremail,
    subject:subject,
    text: text.replace("[User's Name]",issuedbookowner.user_id.name).replace("[Book Title]",issuedbook.title).replace("[Author's Name]",issuedbook.author).replace("[Book Genre]",issuedbook.genre).replace("[Issue Date]",issuedate).replace("[Return Date]",returndate)

  }
  transporter.sendMail(message)
}

const sendmailspecial=async (req,subject,text,currentdate,penalty)=>{
  let returnbook= await issue.findOne({book_id:req.params.id});
  let owner_returnbook=await returnbook.populate("user_id");
  let owneremail= owner_returnbook.user_id.email;
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
    to: owneremail,
    subject:subject,
    text: text.replace("[User's Name]",owner_returnbook.user_id.name).replaceAll("[Book Title]",returnbook.title).replaceAll("[Author's Name]",returnbook.author).replace("[Due Date]",returnbook.returndate).replace("[Late Return Date]",currentdate).replaceAll("[Penalty Amount]",penalty)

  }
  transporter.sendMail(message)
}

const sendmailspecial2=async (req,subject,text)=>{
  let returnbook= await issue.findOne({book_id:req.params.id});
  let owner_returnbook=await returnbook.populate("user_id");
  let owneremail= owner_returnbook.user_id.email;
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
    to: owneremail,
    subject:subject,
    text: text.replace("[Customer's Name]",owner_returnbook.user_id.name).replace("[Book Title]",returnbook.title).replace("[Author's Name]",returnbook.author)

  }
  transporter.sendMail(message);
}

// ROUTE 1:create a book using : POST "/api/book/createbook". --admin
router.post(
    "/createbook", fetchuser,
    [
      body("title"),
      body("author"),
      body("genre"),
      body("quantity"),
    ],
    async (req, res) => {
      let success=false;
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      try {
        let books=await book.findOne({title:req.body.title})
        if(books){
          success=false;
          return res.json({success,msg:"a book with this title was already created!"});
        }
        if(req.user.role!=="admin"){
          success=false;
          return res.status(400).json({msg:"You are not authorized to do this task!"})
        }
        success=true;
         books = await book.create({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          quantity: req.body.quantity,
        });
        res.status(200).json({success,message:"book created successfully!"});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 2:update a book using : PUT "/api/book/updatebook/:id". --admin
router.put(
    "/updatebook/:id", fetchuser,
    async (req, res) => {
      const {title,author,genre,quantity}=req.body;
      try {
        let success=false
        const newBook={};
        if (title){
          newBook.title=title;
        }
        if (author){
          newBook.author=author;
        }
        if (genre){
          newBook.genre=genre;
        }
        if (quantity){
          newBook.quantity=quantity;
        }
        let booktu =await book.findById(req.params.id);
        if(!booktu){
          success=false
          return res.json({success,msg:"book Not found!"});
        }
        if (req.user.role !== "admin"){
          success=false
          return res.status(400).json({success,msg:"You are not Authorized to this task"});
        }
        let booku= await book.findByIdAndUpdate(
          req.params.id,
          {$set:newBook},
          {new: true},
        );
        success=true
        res.status(200).json({success,msg:"Book updated successfully",booku})
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 3:delete a book using : DELETE "/api/book/deletebook/:id". --admin
router.delete(
    "/deletebook/:id", fetchuser,
    async (req, res) => {

      const {title,author,genre,quantity}=req.body;
      try {
        let success=false
        let booktd=await book.findById(req.params.id);
        if (!booktd){
          success=false
          return res.json({success,msg:"Book not found!"});
        }
        if (req.user.role!=="admin"){
          success=false
          return res.status(400).json({success,msg:"You are not authorized to this task!"});
        }
        success=true
        bookd=await book.findByIdAndDelete(req.params.id);
        res.status(200).json({success,msg:"Book has been deleted successfully!"});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 4:pagination (get all books pagewise) a book using : GET "/api/book/pagination".
router.get(
    "/pagination",
    async (req, res) => {
      let page=parseInt(req.query.page);
      const limit = 12;
      try {
        const totalBooks = await book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await book.find().skip((page - 1) * limit).limit(limit);

    if (books.length === 0) {
      return res.json({ msg: "No books found!" });
    }

    res.status(200).json({ totalBooks, totalPages, currentPage: page, books });
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 5:search a book using : GET "/api/book/search".
router.get(
    "/search",
    async (req, res) => {
      const {title,author}=req.query;
      try {
        let success=false;
      const query = {};
      if (title){
        query.title = { $regex: new RegExp(`${title}`, 'i') }; //to make the search case insensitive
      };
      if (author){
        query.author = { $regex: new RegExp(`${author}`, 'i') }; //to make the search case insensitive
      };
      const books = await book.find(query);
      if (books.length === 0) {
        success=false;
        return res.json({success, msg: "No books found!" });
      }
      success=true;
      res.status(200).json({success,books});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 6:issue a book using : POST "/api/book/issue".
router.post(
    "/issue/:id", fetchuser,
    async (req, res) => {
      try {
        let success=false;
      var issuedate = new Date().toLocaleDateString();
      let issuedbook= await book.findById(req.params.id);
      var returndate = new Date();
    let num=Math.floor(Math.random() * (7) + 7);
    returndate.setDate(returndate.getDate() + num);
    returndate=returndate.toLocaleDateString();
    let useralreadyissued= await issue.findOne({book_id:req.params.id,user_id:req.user.id});
    let maxissueofuser=await issue.find({user_id:req.user.id});

      if(!issuedbook){
        success=false;
        return res.status(400).json({success,msg:"Book not found!"});
      };

      if(issuedbook.quantity<=0){
        success=false;
        await book.deleteOne({ _id: req.params.id });
        return res.status(400).json({success,msg:"Book is out of stock!"});
      };


      if(maxissueofuser.length>=4){
        success=false;
        return res.json({success,msg:"you can at max issue only 4 books at a time!"});
      }

      if(useralreadyissued){
        success=false;
        return res.json({success,msg:"You can Issue a book only once!"});
      }
      
      let issuebook= await issue.create({
        title:issuedbook.title,
        author:issuedbook.author,
        user_id: req.user.id,
        book_id: issuedbook._id,
        issuedate:issuedate,
        returndate:returndate,
      });
      success=true;
      issuedbook.quantity-=1;
      issuedbook.save();
      res.status(200).json({success,msg:"Book issued successfully!",issuebook});
      sendmail(req,process.env.SUBJECT_ISSUE,process.env.TEXT_ISSUE,issuedate,returndate);
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 7:return a book using : POST "/api/book/return".
router.post(
    "/return/:id", fetchuser,
    async (req, res) => {
      function convertToDateObject(dateString) {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
      }
      try {
        let success=false
      let returnbook= await issue.findOne({book_id:req.params.id});
      let currentdate=new Date();
      const returndate = convertToDateObject(returnbook.returndate);
      if(!returnbook || returnbook.user_id.toString() !== req.user.id){
        success=false
        return res.json({success,msg:"Book not found!"})
      }
      if(currentdate>returndate){
        success=true
        const daysLate = Math.floor((currentdate - returndate) / (1000 * 60 * 60 * 24));
        const penalty="Rs." + daysLate*1000;
        let newcurrentdate=new Date();
        newcurrentdate=newcurrentdate.toLocaleDateString();
        sendmailspecial(req,process.env.SUBJECT_PENALTY,process.env.TEXT_PENALTY,newcurrentdate,penalty);
        let returnbookquantity= await book.findById(returnbook.book_id);
        returnbookquantity.quantity+=1;
        await returnbookquantity.save();
        await issue.deleteOne({_id:returnbook._id});
        return res.json({success,msg:"book is returned late!"});
      };
      success=true
      let returnbookquantity= await book.findById(returnbook.book_id);
        returnbookquantity.quantity+=1;
        await returnbookquantity.save();
        sendmailspecial2(req,process.env.SUBJECT_RETURN,process.env.TEXT_RETURN);
        await issue.deleteOne({_id:returnbook._id});
      return res.json({success,msg:"book returned on time!"});
      } catch (error) {
        console.log(error);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  );

// ROUTE 8:get single book using : GET "/api/book/bookdetails".
router.get(
  "/bookdetails/:id",
  async (req, res) => {
    try {
      let success=true
    let bookdetails =await book.findById(req.params.id)
    res.status(200).json({success,bookdetails});
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

// ROUTE 9:get single book using : GET "/api/book/allbooks". --admin
router.get(
  "/allbooks",fetchuser,
  async (req, res) => {
    try {
      let success=false
      if(req.user.role !=="admin"){
        success=false
        return res.status(400).json({msg:"You aren't authourized to do this!"})
      }
    success=true
    let allbooks =await book.find()
    res.status(200).json({allbooks});
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

// ROUTE 10:get myissued books using : GET "/api/book/myissues".
router.get(
  "/myissues/:id",fetchuser,
  async (req, res) => {
    try {
      let success=false
      
    success=true
    user_id=req.params.id
    let myIssuedBooks =await issue.find({user_id})
    res.status(200).json({success,myIssuedBooks});
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

// ROUTE 11:get issued books using : GET "/api/book/issues". --Admin
router.get(
  "/issues",fetchuser,
  async (req, res) => {
    try {
      let success=false
      if(req.user.role !== "admin"){
        success=false
        res.status(400).json({success,msg:"You are not authorized!"})
      }
      
    success=true
    let IssuedBooks =await issue.find()
    res.status(200).json({success,IssuedBooks});
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

// ROUTE 12:get is issued a book using : GET "/api/book/is-issue". 
router.get(
  "/is-issue/:id",fetchuser,
  async (req, res) => {
    try {
      let success=false
      let returnbook= await issue.findOne({book_id:req.params.id,user_id:req.user.id});
      if(!returnbook ){
        success=false
        return res.json({success,msg:"Book was not issued by this user!"})
      }
    success=true
    res.status(200).json({success});
    } catch (error) {
      console.log(error);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

module.exports = router;