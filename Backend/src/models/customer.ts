import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  INR: {
    type: Number,
    required: true,
  },
  RUB: {
    type: Number,
    required: true,
  },
  USD: {
    type: Number,
    required: true,
  },
  creater_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const customer =  mongoose.model("customer", customerSchema);

export default customer;