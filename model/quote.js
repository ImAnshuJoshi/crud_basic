const mongoose =require("mongoose");

const quoteSchema = mongoose.Schema({
  quote: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
  },
});

const quoteModel = mongoose.model("Quote", quoteSchema);

// module.default exports = UserModel;
module.exports= quoteModel;
