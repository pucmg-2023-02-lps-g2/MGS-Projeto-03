const supabase = require("../config/supabase");

async function getAllInstitutions() {
    const { data, error } = await supabase.from('institutions').select('*');
    if (error) {
        throw error;
    }
    return data;
}

module.exports = {
    getAllInstitutions,
}