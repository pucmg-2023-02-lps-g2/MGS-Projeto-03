const { supabase } = require('../app')

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        
    },

    async register(req, res) {
        const { email, senha, nome, cpf, rg, endereco, instituicao, curso } = req.body

        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        console.log(error);

        console.log(data);
    },
    
    async logout(req, res) {

    }
}