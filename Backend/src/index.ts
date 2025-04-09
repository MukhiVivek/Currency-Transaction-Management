import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongodb_URL } from "./config";

const app = express();
app.use(express.json());
app.use(cors());

//mongose 

const dburl :any  = mongodb_URL ;

main().then(() => {
  console.log("connected to DB");
}).catch((err) => {
  console.log(err);
})

async function main() {
  await mongoose.connect(dburl);
}

//routes

import user from "./routes/user";
import transaction from "./routes/transaction";
import customer from "./routes/customer";

app.use("/api/v1/user", user);
app.use("/api/v1/customer", customer);
app.use("/api/v1/transaction", transaction);
 
app.get("/", (req, res) =>{
  res.send("Server is on");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});