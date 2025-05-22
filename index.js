const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Chat=require('./models/chat.js');
const methodOverride=require('method-override');

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public"))); 
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


main().then(()=>{
  console.log('Connected to MongoDB Successfully');
}).catch(err=>{
  console.error('Error connecting to MongoDB:', err);
    // Exit the process with failure
});




async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//mongodb with express 
//index route

app.get('/chats',async (req,res)=>{
  let chats=await Chat.find();
  console.log(chats);
  res.render('index.ejs',{chats:chats});
})
// new Route
app.get('/chats/new',(req,res)=>{
  res.render('new.ejs');
});
// create route
app.post('/chats',(req,res)=>{
  let { from ,to , msg }=req.body;
  let newchat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date(),
  });
  newchat
  .save().then((res)=>{
    console.log(res);
    console.log('Chat saved successfully');
  }).catch((err)=>{
    console.log(err);
  });
  res.redirect('/chats');
})

let chat1=new Chat({
  from:'John',
  to:'Doe',
  msg:'Send me your Exam Marksheet',
  created_at:new Date(),
});
chat1.save().then((res)=>{  //UTC
  console.log(res);
  console.log('Chat saved successfully');
})

//Edit Route
app.get('/chats/:id/edit',async (req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
  res.render('edit.ejs',{chat:chat});
}); 
//Update Route
app.put('/chats/:id', async (req, res) => {
  const { id } = req.params;
  const { msg: newMsg } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );

  console.log(updatedChat);
  res.redirect('/chats');
});

//DEstroy Route
app.delete('/chats/:id',async (req,res)=>{
  const { id } = req.params;
  let delChat=await Chat.findByIdAndDelete(id);
  console.log(delChat);
  res.redirect('/chats');
});

app.get('/',(req,res)=>{
  res.send('Root is Working..');
})
app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})