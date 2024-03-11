const express = require("express");
const app =  express();
const mongoose =  require("mongoose");
const path =  require("path");
const Chat =  require("./models/chat");

const methodOverride =  require("method-override"); 
app.use(methodOverride("_exchange"));


app.set("views" ,path.join(__dirname,"views"));
app.set("view engine" ,"ejs");
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended : true}));


main().then(()=>{
    console.log("connection successful ");
}).catch((e)=>{
    console.log(e);
})



async function main (){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp_mini');
}



app.listen (8080, () =>{
    console.log("server is listening to port 8080.");

});


app.get("/",(req,res)=>{
    res.send("working ");
})

app.get("/chats",async (req,res)=> {
let chats =  await Chat.find();
// console.log(chats);
res.render("index.ejs" ,{chats});


});

app.get("/chats/new",(req,res)=>{
res.render("new_chat.ejs");
});
 
 app.post("/chats",(req,res)=> {
let {from , to , msg} =  req.body;

// console.log(req.body);

let newChat =  new Chat ({
    from :  from,
    to : to ,
    message : msg,
    created_at: new Date,});  

newChat.save();
res.redirect("/chats");

});

app.get("/chats/:id/edit",async (req,res) =>{
    let {id} =  req.params;
   let chat =  await Chat.findById(id);
res.render("edit.ejs" , {chat});
});


app.put("/chats/:id", async (req,res) =>{

let { id }=  req.params;
let newMsg = req.body.msg2;
console.log(newMsg);

await Chat.findByIdAndUpdate   
 (id , {message : newMsg} , 
 { runValidators :true }
 );

// console.log(updatedChat);

console.log("put req working");
res.redirect("/chats");

});

app.delete("/chats/:id",async (req,res) =>{

    let {id} =  req.params;

    await Chat.findByIdAndDelete(id);
res.redirect("/chats");

});