const express = require('express');
const app = express();
const cors = require("cors");
const uploadRoutes = require("./routes/api/uploads");
const coordinateRoutes = require("./routes/api/coordinate")
const originalRoutes = require("./routes/api/originals")
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }


app.use(cors(corsOptions))

app.use(express.json());

app.use(uploadRoutes);
app.use(coordinateRoutes);
app.use(originalRoutes);
app.listen(8080);