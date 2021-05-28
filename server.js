import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

// app config
const app = express();
const port = process.env.PORT || 2002;
dotenv.config();
const mongo_connect_url = `mongodb+srv://rahulll:${process.env.MONGO_PASSWORD}@cluster0.x2c7d.mongodb.net/test?retryWrites=true&w=majority`;

// middlewares
app.use(express.json());
app.use(Cors());

// db config
mongoose.connect(mongo_connect_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api endpoints
app.get("/", (req, res) => res.status(200).send("Hello Puneethae"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  console.log(dbCard);
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listener
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
  console.log(process.env.MONGO_PASSWORD);
});
