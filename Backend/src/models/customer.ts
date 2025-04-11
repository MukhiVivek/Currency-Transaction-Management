import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  i_balance: {
    type: Number,
    required: true,
  },
  r_balance: {
    type: Number,
    required: true,
  },
  u_balance: {
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