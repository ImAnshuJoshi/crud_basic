// const user= require('../model/user.js')
const quote= require('../model/quote.js')


//Adding quote
const addquote = async (req,res,next) =>{
    const newRecord = new quote(req.body);
    try{
        const savedRecord = await newRecord.save();
        console.log(newRecord);
        res.status(200).json(savedRecord);
    }
    catch(err){
        next(err);
    }

}

//Getting quote by its id
const getquote = async (req,res,next) =>{
    try{
        const getquote = await quote.findById({_id:req.params.id})
        res.status(200).json(getquote);
    }
    catch(err){
        next(err);
    }
}

//updating the quote
const updatequote = async (req,res,next) =>{
    try{
        const newquote= await quote.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {
            $new:true
        })
        res.status(200).json(newquote);
    }
    catch(err){
        next(err);
    }
}

//deleting the quote
const deletequote = async (req,res,next) =>{
    try{
        const deleted_quote= await quote.findByIdAndRemove(req.params.id)
        res.status(200).json(deleted_quote);
    }
    catch(err){
        next(err);
    }
}

//getting all quotes of a user
const getuserquotes = async (req,res,next) =>{
    try{
        const getquotes = await quote.find({userId:req.params.id})
        console.log(getquotes);
        res.status(200).json(getquotes);
    }
    catch(err){
        next(err);
    }
}
module.exports={addquote,deletequote,updatequote,getquote,getuserquotes}