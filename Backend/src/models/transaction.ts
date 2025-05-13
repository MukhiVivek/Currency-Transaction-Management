import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date : Date,
  sender_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  s_amount : Number,
  s_currency : String,
  s_balance : Number,
  receiver_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  r_balance : Number,
  r_amount : Number,
  r_currency : String,
  status : String,
  rate: Number,
  note : String,  
  creater_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const transaction =  mongoose.model("transaction", transactionSchema);

export default transaction;