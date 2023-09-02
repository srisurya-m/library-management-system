function generateRandomNum(min=1,max=4){
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand
  }

function generateRandomImage() {
  const image_1="https://i.postimg.cc/dVdcpr3H/sample-1.png"
  const image_2="https://i.postimg.cc/D0mtgbRc/sample-2.png"
  const image_3="https://i.postimg.cc/m2HngR4h/sample-3.png"
  const image_4="https://i.postimg.cc/WzRHMf6s/sample-4.png"
  let val = generateRandomNum();
  if(val===1){
    return image_1
  }
  if(val===2){
    return image_2
  }
  if(val===3){
    return image_3
  }
  if(val===4){
    return image_4
  }
}

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  quantity:{
    type:Number,
    required: true,
  },
  image:{
    url:{
      type:String,
      required:true,
      default: generateRandomImage()
    }
  }
  
});
const book = mongoose.model("book", bookSchema);
module.exports = book;