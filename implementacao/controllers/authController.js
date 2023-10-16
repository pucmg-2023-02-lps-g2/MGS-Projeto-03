const { supabase } = require('../app');
const { getAllCourses } = require('../models/courseModel');
const { getAllInstitutions } = require('../models/institutionModel');
const { registerUser, loginStudent, loginTeacher } = require('../models/userModel');

module.exports = {
    async login(req, res) {
        const { email, senha, usuario } = req.body;

        var userData

        if (usuario == 'aluno') {
            userData = await loginStudent({ email, password: senha })

            res.cookie('rg', userData.rg)
            res.cookie('course_id', userData.course_id)
            res.cookie('user_role', 'student')
        } else {
            userData = await loginTeacher({ email, password: senha })

            res.cookie('department_id', userData.department_id)
            res.cookie('user_role', 'teacher')            
        }

        res.cookie('token', userData.uuid)
        res.cookie('name', userData.name)
        res.cookie('email', userData.email)
        res.cookie('cpf', userData.cpf)
        res.cookie('institution_id', userData.institution_id)

        res.redirect('/home')
    },

    async renderRegister(req, res) {

        const institutions = await getAllInstitutions()

        const courses = await getAllCourses()

        res.render('register', { institutions, courses })
    },

    async register(req, res) {
        const { email, senha, nome, cpf, rg, endereco, instituicao, curso } = req.body

        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        await registerUser({ cpf, nome, rg, endereco, curso, instituicao, uuid: data.user.id })

        res.render('login')
    },
    
    async logout(req, res) {

        res.cookie('token', null, { expires: new Date(0) })
        res.cookie('name', null, { expires: new Date(0) })
        res.cookie('email', null, { expires: new Date(0) })
        res.cookie('cpf', null, { expires: new Date(0) })
        res.cookie('rg', null, { expires: new Date(0) })
        res.cookie('course_id', null, { expires: new Date(0) })
        res.cookie('institution_id', null, { expires: new Date(0) })
        res.cookie('department_id', null, { expires: new Date(0) })
        res.cookie('user_role', null, { expires: new Date(0) })

        res.render('login')
    }
}