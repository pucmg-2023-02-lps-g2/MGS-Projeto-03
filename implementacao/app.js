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

app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/public/icons', express.static('./public/icons'));

app.use((req, res, next) => {

  if (req.cookies.token) {
    if (req.path === '/auth/login' || req.path === '/auth/register' || req.path === '/') {
      res.redirect('/app/home'); 
      return;
    }
  } else {
    if (req.path !== '/auth/login' && req.path !== '/auth/register' && req.path !== '/') {
      res.redirect('/');
      return;
    }
  }
  next();
});

app.use("/auth", require("./routes/authRoutes.js"));

app.use("/app", require("./routes/appRoutes.js"));

app.use("/student", require("./routes/studentRoutes.js"));

app.use("/partner", require("./routes/partnerRoutes.js"));

app.use("/benefit", require("./routes/benefitRoutes.js"));

app.use("/", require("./routes/defaultRoutes.js"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})