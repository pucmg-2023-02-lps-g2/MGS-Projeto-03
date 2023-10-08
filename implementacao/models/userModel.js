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