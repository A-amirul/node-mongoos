require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Express js server is working!"
  })
});

// MongoDB connection
mongoose.connect(`${process.env.DB_URL}`, {
  autoIndex: true
});

app.use("/api/v1", router);

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));  
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// error handle start
app.all("*", (req, res, next) => {
  const err = new Error(`Page not found! ${req.originalUrl}`)
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
})

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status=error.status || "error"
  res.status(error.statusCode).json({
    status: "error",
    message: error.message || "Something went wrong!"
  });
})
// error handle end

// Express.js routes and middleware can be added here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
