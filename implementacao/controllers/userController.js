const supabase = require("../config/supabase");

const userModel = require(".././models/userModel")

async function listStudents(req, res) {
    try {
      const students = await userModel.getAllStudents();
      
      res.render('users.ejs', { students });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

module.exports = {
    listStudents,
};