const supabase = require("../config/supabase");

async function getUserInfo(cpf) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', cpf)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function getAllStudents() {
  const { data, error } = await supabase.from('students').select('*');
  if (error) {
    throw error;
  }
  return data;
}

async function addStudent({ cpf, name, address, course_id }) {
  const { data, error } = await supabase.from('students').insert([
      {
          cpf,
          name,
          address,
          course_id,
      },
  ]);

  if (error) {
      throw error;
  }

  return data;
}

async function deleteStudent(studentCPF) {
  const { error } = await supabase
    .from("students")
    .delete()
    .eq("cpf", studentCPF);

  if (error) {
    throw error;
  }
}

async function getAllTeachers() {
  const { data, error } = await supabase.from('teachers').select('*');
  if (error) {
    throw error;
  }
  return data;
}

module.exports = {
  getUserInfo,
  getAllStudents,
  addStudent,
  deleteStudent,
  getAllTeachers,
};
