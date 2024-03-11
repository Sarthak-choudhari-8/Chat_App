const mongoose =  require("mongoose");
const Chat  =  require("./models/chat.js");
// const Chat =  require("./models/chat");



main().then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e);
});



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp_mini');

}


let all_chat= [
{
    
from:"shivraj",
to:"sarthak",
message:"hello sarthak .",
created_at: new Date(),

},

{
    from:"pramod",
    to:"yashraj",
    message:"hello yashraj .",
    created_at: new Date(),

},

{
    from:"tamas",
    to:"shivraj",
    message:"hello shivraj .",
    created_at: new Date(),
},
{
    from:"yashraj",
    to:"tamas",
    message:"hello tamas .",
    created_at: new Date(),
},

{
    from:"pramod",
    to:"krushna",
    message:"hello krushna .",
    created_at: new Date(),
},

{
    from:"krushna",
    to:"sarthak",
    message:"hello sarthak .",
    created_at: new Date(),
},

];

// Chat.insertMany(all_chat);