const express = require('express');
const app = express();
const cors = require("cors");
const uploadRoutes = require("./routes/api/uploads");

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }


app.use(cors(corsOptions))

app.use(express.json());

app.use(uploadRoutes);

app.listen(8080);