const express = require('express');
const joblistings = require("./models/joblisting");
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/Job')
    .then(() => {
        console.log("Connected to Database.!");
        const app = express();
        app.use(bodyParser.json());
        app.use(express.json());
        app.use(cors());

        app.get('/', async (req, res) => {
            const jobs = await joblistings.find();
            res.json(jobs);
        });

        app.get('/job/:id/', async (req, res) => {
            const job = await joblistings.findOne({JobID:req.params.id});   
            res.json(job);
        }); 
        app.delete('/job/:id',async(req,res)=>{
            const job=await joblistings.deleteOne({JobID:req.params.id});
            res.send(job);
        })
        app.post('/job',async(req,res)=>{
            const job = new joblistings(req.body);
			const result = await job.save();
			res.send(result);
        })
        app.put('/job/:id',async(req,res)=>{
            const job = await joblistings.findOne({JobID:req.params.id});
            job.JobID=req.body.JobID;
            job.Title=req.body.Title;
            job.CompanyName=req.body.CompanyName;
            job.Location=req.body.Location;
            job.Salary=req.body.Salary;
            const confirm=await job.save();
            res.send(confirm);
        })
        app.listen(8000, () => {
            console.log("Server Started");
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
