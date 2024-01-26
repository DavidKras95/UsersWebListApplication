const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.route')

const app = express()
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());


app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
