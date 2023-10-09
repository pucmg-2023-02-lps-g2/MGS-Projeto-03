const supabase = require("../config/supabase");

async function getAllPartners() {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) {
        throw error;
    }
    return data;
}

async function addPartner({ id, name }) {
  const { data, error } = await supabase.from('partners').insert([
      {
          id,
          name,
      },
  ]);

  if (error) {
      throw error;
  }

  return data;
}

async function deletePartner(partnerId) {
    const { error } = await supabase
      .from("partners")
      .delete()
      .eq("id", partnerId);
  
    if (error) {
      throw error;
    }
  }

module.exports = {
    getAllPartners,
    addPartner,
    deletePartner,
}