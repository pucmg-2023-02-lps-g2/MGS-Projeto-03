const supabase = require("../config/supabase");

async function getAllBenefits() {
    const { data, error } = await supabase.from('benefits').select('*');
    if (error) {
        throw error;
    }
    return data;
}

async function getBenefitById(id) {
    try {
        const { data, error } = await supabase
            .from('benefits')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllBenefits,
    getBenefitById
};
