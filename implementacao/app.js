require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
  
const supabase = createClient(supabaseUrl, supabaseKey)

async function queryTest() {
    try {
        let { data, error } = await supabase
        .from('students')
        .select('cpf');

        if (error) {
            throw error;
        }

        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

queryTest();

