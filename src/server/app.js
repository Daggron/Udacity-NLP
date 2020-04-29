const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Aylien = require("aylien_textapi");
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(morgan('dev'));

const textApi = new Aylien({
  application_id: "943d9009",
  application_key: "1ebb086079b6b00921c0275ee9d47062"
});

app.get("/", (req, res) => {

  res.sendFile("index.html");

});

app.post("/api/text-analysis", (req, res) => {
  const { text } = req.body;

  textApi.sentiment({ text }, (error, result, remaining) => {
    if(error) return res.send('An error occured at api');
    res.send(result);
  });

});

app.post("/api/page-analysis", (req, res) => {
  const { text } = req.body;
  textApi.sentiment({ url: text }, (error, result, remaining) => {
    console.log(result, remaining);
    res.send(result);
  });
});

app.listen(PORT,()=>{
  console.log(`Firing server on port ${PORT}`);
});
