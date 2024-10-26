const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User"); 
const bcrypt = require("bcrypt");
require("dotenv").config(); 

const app = express();

app.use(express.json());
app.use(cors());

const mongoURI = "mongodb+srv://Bala:Helloworld@namaste.dvi13.mongodb.net/";


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");

    // Define a basic route
    app.get("/", (req, res) => {
      res.send("Hello World! The server is running and connected to MongoDB.");
    });

    app.post("/api/register", async (req, res) => {
      const { phoneNumber, email, password } = req.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          phoneNumber,
          email,
          password: hashedPassword,
        });

        await newUser.save();
        res
          .status(201)
          .json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error registering user:", error);
        res
          .status(500)
          .json({ message: "Error registering user", error: error.message });
      }
    });

    
    app.get("/api/users", async (req, res) => {
      try {
        const users = await User.find({}, "phoneNumber email");
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

    
    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

       
        res.json({ message: "Login successful" });
      } catch (error) {
        console.error("Login error:", error);
        res
          .status(500)
          .json({ message: "Server error, please try again later" });
      }
    });

    
    const PORT = process.env.PORT || 5000;

    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
