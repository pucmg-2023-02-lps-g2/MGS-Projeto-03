require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cookieParser = require('cookie-parser');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

module.exports.supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// Middleware :)
app.use((req, res, next) => {

    if (req.cookies.token) {
      if (req.path === '/login' || req.path === '/register') {
        res.redirect('/home'); 
        return;
      }
    } else {
      if (req.path !== '/login' && req.path !== '/register' && req.path !== '/') {
        res.redirect('/login');
        return;
      }
    }
    next();
});

app.set("view engine", "ejs");

app.use("", require("./routes/routes.js"));
app.use('/public/icons', express.static('./public/icons')); // Display de imagens só funciona com esse middleware

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})