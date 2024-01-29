require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.route');
// const authRoutes = require('./src/routes/auth.route');
const mongoose = require('mongoose');
const User = require('./src/models/userData');
const cookieParser = require('cookie-parser');




const app = express();



//Connect to MongoDb
const dbURI = process.env.MONGODB_URI2;
mongoose.connect(dbURI)
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err))

// const key = require('crypto').randomBytes(64).toString('hex');
// console.log(key);

const accessToken = process.env.TOKEN_SECRET;

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', userRoutes);
// app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
