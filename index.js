require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.route');
const mongoose = require('mongoose');
// const User = require('./src/models/userData');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsMiddleware = require('./src/middleware/corsMiddleware');

const app = express();

//Connect to MongoDb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => console.log('Connected to db'))
  .catch((err) => console.log(err))

const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/', userRoutes);
app.get('/',cors(corsMiddleware.corsOptions), (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'view.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
