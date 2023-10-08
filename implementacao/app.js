require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT;

app.use(express.json);
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.send("Bem-vindo(a) ao MGS");
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})