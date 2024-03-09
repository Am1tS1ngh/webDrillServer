const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const users = require("../models/users.js");

// create 
router.post("/create", async (req,res)=> {
    const {name, email, mobile, password, location} = req.body;
    try {
        const data  = await users.create({
            name: name,
            email: email,
            mobile: mobile,
            password: password,
            location: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
              },
        });
        res.status(201).json(data)
    } catch (error) {
        if (error.code === 11000) {
            console.error('User with the same email already exists.');
            res.status(400).json({ error: 'User with the same email already exists.' });
          } else {
            console.error('Error registering user:', error.message);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
    
});

//get single users
router.get("/:id",async (req, res) => {
    try {
        const singleQuery = await users.findOne({usid: req.params.id});
        
        res.status(200).json(singleQuery);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
    
});

// delete users
router.delete("/delete/:id",async (req, res) => {

    try {
        const singleQuery = await users.findOneAndDelete({usid: req.params.id});
        
        res.status(200).json(singleQuery);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

// put/patch
router.patch("/update/:id",async (req, res) => {
    try {
        const singleQuery = await users.findOneAndUpdate({usid: req.params.id}, req.body, {
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
        const showAll = await users.find({})
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
});

router.post("/nearby", async (req, res)=> {
    const {radius, latitude, longitude} = req.body;
    try {
        const nearbyUsers = await users.find({
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude],
                },
                $maxDistance: 1 * 1000,
              },
            },
          });
        res.send(JSON.stringify(nearbyUsers));
        // res.status(200).json(nearbyUsers);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
})

module.exports = router;