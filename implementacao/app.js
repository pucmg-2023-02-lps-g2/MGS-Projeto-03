require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

module.exports.supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("", require("./routes/routes.js"))

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})