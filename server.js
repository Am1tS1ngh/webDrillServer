const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); 
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:3000',
    // Add other allowed origins as needed
  };
app.use(cors(corsOptions));

// importing all routing files
const userRouter = require("./routes/userRoute"); 
app.use(express.json());

app.set("views", path.join(__dirname, "views"));  // Views directory is set to the "views" folder
app.set("view engine", "ejs");
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
    res.render("index")
})
app.use("/users", userRouter);
