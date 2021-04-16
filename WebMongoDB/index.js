let app = require("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
let Courses = [{}] ;
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/AddCDetails",(req,res)=> {
       let cid = req.body.cid;
       let cnmae = req.body.cnmae;
       let camount = req.body.camount;
       let mongoClient = require("mongodb").MongoClient;
       let url = "mongodb://localhost:27017"
       mongoClient.connect(url, {useUnifiedTopology: true },(err1,client)=>{
       if(!err1){
                   let db = client.db("meanstack");
           db.collection("Courses").insertMany({_Cid:+cid,Cname:+cnmae,Camount:+camount},(err2,result)=>{
                   if(!err2){
                       console.log(result.insertedCount);
                   }else {
                       console.log(err2.message);
                   }
                   client.close();    
               });           
           }
       });
       res.sendFile(__dirname+"/Add.html");

})
app.post("/deleteCDetails/:cid",(req,res)=> {
    let cid = req.body.cid;
    let mongoClient = require("mongodb").MongoClient;
    let url = "mongodb://localhost:27017";
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
    if(!err1){
        let db = client.db("meanstack");
        db.collection("Courses").deleteMany({_Cid:+cid},(err2,result)=> {
            if(!err2){
                   if(result.deletedCount>0){
                        console.log("Record deleted successfully")
                   }else {
                        console.log("Record not present")
                   }
            }
            client.close();
             })           
       }
    })    
    res.sendFile(__dirname+"/Delete.html")       
})
app.get("/get", (req,res)=>{
    let mongoClient = require("mongodb").MongoClient;
    let url = "mongodb://localhost:27017";
    mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
    if(!err1){
        let db = client.db("meanstack");
        db.collection("Product").updateMany({_Cid:+cid},{Camount:+camount},(err2,result)=> {
            if(!err2){
                   if(result.modifiedCount>0){
                        console.log("Record updated successfully")
                   }else {
                        console.log("Record didn't update");
                   }
            }
            client.close();
        })           
      }
    })
   
    res.json(Courses);
})

app.post("/get",(req,res)=> {
           
        let mongoClient = require("mongodb").MongoClient;
        let url = "mongodb://localhost:27017";
        mongoClient.connect(url,{ useUnifiedTopology: true },(err1,client)=> {
        if(!err1){
            let db = client.db("meanstack");
            let cursor = db.collection("Courses").find({"Cid":+cid},{"Camount":+camount}, ); 
            cursor.each((err2,doc)=> {
            if(doc!=null){
                console.log("id is "+doc._id+"Product Name is "+doc.pname+" Price is "+doc.price);
                       }
            client.close();
             })
                       
         }
     })
     res.send(__dirname+"/Fetch.html");
})
app.listen(9090,()=>console.log("server Running on port 9090"));