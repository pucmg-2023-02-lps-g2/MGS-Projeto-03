const supabase = require("../config/supabase");

async function getAllCourses() {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
        throw error;
    }
    return data;
}

module.exports = {
    getAllCourses,
}