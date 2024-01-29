const cors = require("cors");
const allowedOrigins = [
  "http://localhost:3000/",
  "https://www.google.com",
  "https://www.facebook.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = cors(corsOptions);
