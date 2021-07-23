const express = require("express");
const app = express();
const mongoose = require("mongoose")
const config = require('config')
const cors = require('cors')
const compression = require("compression")
const helmet = require("helmet")
const students = require('./routes/students')
const attendances = require('./routes/attendances')
const users = require('./routes/users')
const auth = require("./routes/auth");

if(!config.get('jwtPrivateKey')){
  console.log('Fatal Error: jwtPrivateKey is not Defined');
  process.exit(1)
}

mongoose
  .connect("mongodb://localhost/students-attendance", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((ex) => console.log("Could connect to mongodb", ex));
  
  app.use(cors());
  app.use(express.json());
  app.use("/api/students", students);
  app.use("/api/attendances", attendances);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(helmet());
  app.use(compression());  


  // const port = process.env.PORT || 5000;
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
