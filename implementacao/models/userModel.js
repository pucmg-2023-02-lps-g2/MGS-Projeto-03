const supabase = require("../config/supabase");

async function registerUser({ cpf, nome, rg, endereco, curso, instituicao, uuid }) {
  const { data, error } = await supabase.from('students').insert([
    {
      cpf,
      name: nome,
      address: endereco,
      rg,
      course_id: curso,
      institution_id: instituicao,
      uuid
    }
  ])

  if (error) {
    console.log(error);
  }

  return data
}

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

async function getStudentBalance(cpf) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('balance')
      .eq('cpf', cpf)
      .single();

    if (error) {
      throw error;
    }

    const balance = data.balance;
    return balance;
  } catch (error) {
    throw error;
  }
}

async function getStudentDataById(id) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('uuid', id)
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

async function loginStudent({ email, password }) {

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) { }

  const userData = await getStudentDataById(data.user.id)

  const cookieData = { ...userData, email: data.user.email }

  return cookieData
}

async function getTeacherDataById(id) {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('uuid', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function getTeacherBalance(cpf) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('balance')
      .eq('cpf', cpf)
      .single();

    if (error) {
      throw error;
    }

    const balance = data.balance;
    return balance;
  } catch (error) {
    throw error;
  }
}

async function loginTeacher({ email, password }) {

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (error) { }

  const userData = await getTeacherDataById(data.user.id)

  const cookieData = { ...userData, email: data.user.email }

  return cookieData
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
  registerUser,
  getUserInfo,
  getStudentBalance,
  getStudentDataById,
  getAllStudents,
  addStudent,
  deleteStudent,
  loginStudent,
  getAllTeachers,
  getTeacherBalance,
  loginTeacher,
};
