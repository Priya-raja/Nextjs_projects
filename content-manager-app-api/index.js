const express = require("express");
const app = express();
const PORT = 3001;

const fs = require("fs");
const path = require("path");

// const cors = require("cors")

const pathToFile = path.resolve("./data.json");
console.log(pathToFile);


// var corsOptions = {
//     origin: 'http://localhost/3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
//   app.use(cors(corsOptions))

const getResources = () => JSON.parse(fs.readFileSync(pathToFile));
app.use(express.json());
app.get("/",(req, res) => {  
    res.send("Hello World")
})

app.get("/api/resources",(req, res) => { 
    const resources = getResources();
    res.send(resources);  
})

app.post("/api/resources",(req, res) => { 
    const resources = getResources();
   
    const resource = req.body;
    resource.createdAt = new Date();
    resource.status = "inactive";
    resource.id = Date.now().toString();
    resources.unshift(resource);
    fs.writeFile(pathToFile,JSON.stringify(resources, null, 2), (error) =>{
        if(error) {
           return res.status(422).send("Data are missing!");
        }
        return res.send("Data has been saved");
    }
    )
    
    
})

app.listen(PORT, () => {
    console.log("Server is listening to Port" + PORT);
})

