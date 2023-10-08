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

async function addStudent(cpf, name, address, course_id) {
  try {
    const data = [
      {
        cpf,
        name,
        address,
        course_id,
      },
    ];

    // Se já houver estudante com o mesmo CPF, indicará conflito
    const { data: students, error } = await supabase.from("students").upsert(data, { onConflict: ["cpf"] });

    if (error) {
      throw error;
    }

    if (students.length === 1) {
      return students[0];
    } else {
      throw new Error("Error: Failed to add the student");
    }
  } catch (error) {
    throw error;
  }
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
