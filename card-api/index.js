const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const port = process.env.PORT || 3032;
const mongoose = require("mongoose");
const cardRoute = require("./routes/listCard");
const commentRouter = require("./routes/listComment")



const db = "mongodb+srv://bin:123qwe@cluster0.grswicz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connect DB successed"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use("/api/card", cardRoute)
app.use("/api/comment", commentRouter)

app.listen(port, () => {
    console.log(`Backend running is ${port}`);
});

app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
});

