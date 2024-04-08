const mongoose=require('mongoose')
const job=mongoose.Schema(
    {
        JobID:String,
        Title:String,
        CompanyName:String,
        Location:String,
        Salary:Number,
    }
)
module.exports=mongoose.model("joblisting",job);


