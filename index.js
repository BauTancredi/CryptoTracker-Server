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
app.use("/favorites", require("./routes/favorites"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is working on port ${port}`);
});

//? Work on favorites
