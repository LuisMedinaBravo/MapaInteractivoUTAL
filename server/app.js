//imports
require("dotenv").config();
const express = require("express");
const moongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

//middlewares
app.use(
  cors({ origin: ["http://localhost:3000", "http://localhost:3001", "https://mapa-b75ab.web.app"] })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//database connection
moongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to the database"))
  .catch((err) => console.log(err));

//routes prefix
app.use("/api", require("./routes/Estudiante"));
app.use("/api", require("./routes/Edificio"));
app.use("/api", require("./routes/Curso"));
app.use("/api", require("./routes/Asiste"));
app.use("/api", require("./routes/Sala"));

//start server
app.listen(port, () =>
  console.log("server running at http://localhost:" + port)
);
