const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const interest = require("../models/interests.js");

// create 
router.post("/create", async (req,res)=> {
    const {user, interest, level} = req.body;
    try {
        const data  = await interest.create({
            usid: user,
            interest: interest,
            level: level
        });
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    
});

//get single interest
router.get("/:id",async (req, res) => {
    try {
        const singleQuery = await interest.findOne({inid: req.params.id});
        
        res.status(200).json(singleQuery);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    
});

// delete interest
router.delete("/delete/:id",async (req, res) => {

    try {
        const singleQuery = await interest.findOneAndDelete({inid: req.params.id});
        
        res.status(200).json(singleQuery);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// put/patch
router.patch("/update/:id",async (req, res) => {
    try {
        const singleQuery = await interest.findOneAndUpdate({inid: req.params.id}, req.body, {
            new:true
        });
        res.status(200).json(singleQuery);
    }catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    // res.send("about phone details updated");
});

//get
router.get("/list",async (req, res) => {

    try {
        const showAll = await interest.find({})
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

module.exports = router;