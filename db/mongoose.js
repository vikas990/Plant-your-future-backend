const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;
console.log(dbUrl);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("not connected", err);
  });

//   kdH94iaQf0GdBxNo
