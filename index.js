const express = require('express');
const app = express();
const cors = require("cors");
const uploadRoutes = require("./routes/api/uploads");
const coordinateRoutes = require("./routes/api/coordinate")

app.use("*", cors());
app.use(express.json());

app.use(uploadRoutes);
app.use(coordinateRoutes);
app.listen(8080);