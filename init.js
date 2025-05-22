const mongoose=require('mongoose');
const Chat=require('./models/chat.js');

main().then(()=>{
  console.log('Connected to MongoDB Successfully');
}).catch(err=>{
  console.error('Error connecting to MongoDB:', err);
    // Exit the process with failure
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let AllChats=[
  {
  from:'John',
    to:'Doe',
    msg:'Send me your Exam Marksheet',
    created_at:new Date(),
  },
  {
    from:'Doe',
    to:'John',
    msg:'I will send you the Marksheet tomorrow',
    created_at:new Date(),
  },
  {
    from:'John',
    to:'Doe',
    msg:'Okay, Thanks',
    created_at:new Date(),
  },
  {
    from:'Doe',
    to:'John',
    msg:'You are welcome',
    created_at:new Date(),
  },
  {
    from:'Kunal Ekare',
    to:'Mitesh',
    msg:'Send me your Exam Marksheet',
     created_at:new Date(),
  }
];
console.log(AllChats);

// Chat.insertMany([
//   {
//   from:'John',
//   to:'Doe',
//   msg:'Send me your Exam Marksheet',
//   created_at:new Date(),
//   }
// ]);   