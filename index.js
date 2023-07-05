const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorhandling');
const connectDb = require('./config/dbConnection');

connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users/", require("./routes/userRoutes")); 
app.use("/api/patient/", require("./routes/patientRoutes"));
app.use("/api/doctor/", require("./routes/doctorRoutes"));
app.use("/api/admin/", require("./routes/adminRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 