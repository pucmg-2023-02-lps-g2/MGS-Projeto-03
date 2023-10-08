require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const session = require('express-session');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
  
const supabase = createClient(supabaseUrl, supabaseKey)
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("MGS");
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})




