require("dotenv").config()
const expirePendingBookings = require("./src/jobs/expirePendingBookings");

const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
expirePendingBookings();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
