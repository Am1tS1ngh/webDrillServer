const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());

// importing all routing files
const userRouter = require("./routes/userRoute"); 
app.use(express.json());


mongoose.connect(process.env.URI)
.then(()=>{
    console.log("Connected Successfully to db");
    app.listen(process.env.PORT || 8000, (err) => {
        if(err) console.log(err);
        console.log("running successfully at", process.env.PORT);
    });
})
.catch((error) => {
    console.log("error", error);
});


app.get("/", (req, res) => {
    res.send("Hello Idiot");
})
app.use("/users", userRouter);
