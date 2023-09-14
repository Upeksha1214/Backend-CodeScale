const express = require('express');
const mongoose=require('mongoose')

const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const url=process.env.MONGO_URL
mongoose.connect(url,{useNewUrlParser : true})
const con=mongoose.connection

con.on("open",()=>{
    console.log('monogoDB connected..!')
})

// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
