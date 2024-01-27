require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.route');
const mongoose = require('mongoose');
const User = require('./src/models/user');



const app = express();



//Connect to MongoDb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err))


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
