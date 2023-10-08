require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("", require("./routes/routes.js"))
app.set("view engine", "ejs");


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Bem-vindo(a) ao MGS")
})