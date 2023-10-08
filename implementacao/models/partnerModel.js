const supabase = require("../config/supabase");

async function getAllPartners() {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) {
        throw error;
    }
    return data;
}

module.exports = {
    getAllPartners,
}