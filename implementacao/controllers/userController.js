const userModel = require(".././models/userModel")

async function listUsers(req, res) {
  try {
    const students = await userModel.getAllStudents();
    const teachers = await userModel.getAllTeachers()

    res.render('users.ejs', { students, teachers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

async function getTeacherStudents(department_id) {

    const students = await userModel.getTeacherStudents(department_id);

    return students;

}

async function addBalance(req, res) {

  const cpf = req.params.cpf

  const teacherCpf = req.cookies.cpf

  const { coins } = req.body

  await userModel.addBalance(cpf, teacherCpf, coins)

  res.redirect('/home')
}

async function addStudent(req, res) {
  try {

    const { cpf, name, address, institution_id, course_id } = req.body;

    const data = await userModel.addStudent({ cpf, name, address, institution_id, course_id });

    res.redirect('/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar estudante.');
  }
}

async function getStudentBalance(req, res, cpf) {
  try {
    const balance = await userModel.getStudentBalance(cpf);
    return balance;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

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

async function getTeacherBalance(req, res, cpf) {
  try {
    const balance = await userModel.getTeacherBalance(cpf);
    return balance;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  listUsers,
  addStudent,
  getStudentBalance,
  deleteStudent,
  getTeacherBalance,  
  getTeacherStudents,
  addBalance,
  getTeacherBalance,
};