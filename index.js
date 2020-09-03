const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

//Enable express.json
app.use(express.json({ extended: true }));

// App port
const port = process.env.PORT || 4000;

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is working on port ${port}`);
});

//? PENDINGS
// Get favorites cryptos
// TryCatch
// Axios client
