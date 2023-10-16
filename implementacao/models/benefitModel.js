const supabase = require("../config/supabase");

async function getAllBenefits() {
    const { data, error } = await supabase.from('benefits').select('*');
    if (error) {
        throw error;
    }
    return data;
}


module.exports = {
    getAllBenefits,
};
