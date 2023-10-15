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

async function addStudent(req, res) {
  try {

    const { cpf, name, address, course_id } = req.body;

    const data = await userModel.addStudent({ cpf, name, address, course_id });

    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar estudante.');
  }
};

async function deleteStudent(req, res) {
  const studentCPF = req.params.cpf;

  try {
    await userModel.deleteStudent(studentCPF);
    res.redirect("/users");
  } catch (error) {
    console.error("Erro ao deletar estudante:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function listTeachers(req, res) {
  try {
    const students = await userModel.getAllTeachers();

    res.render('users.ejs', { teachers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  listStudents,
  addStudent,  
  deleteStudent,
  listTeachers,
};