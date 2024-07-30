const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.hfijhsy.mongodb.net/?appName=Cluster0`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB successfully");
    // Optionally, you can ping the server to check connectivity
    const db = mongoose.connection;
    await db.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
module.exports = { run };
