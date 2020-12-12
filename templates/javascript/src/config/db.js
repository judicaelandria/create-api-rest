const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error({ err }));
