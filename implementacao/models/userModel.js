const { supabase } = require("../app");
const { getAllPartners } = require("./partnerModel");

async function renderTransactionsPage(req, res) {
    return new Promise(async (resolve, reject) => {

        const { cpf } = req.cookies

        try {

            const transactions = await getTransactionsFromCpf(cpf)

            res.render('transactions', { transactions })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })
        }
    })
}

async function createNewTransaction(cpf, message) {
    const { data, error } = await supabase.from('transactions').insert([
        {
            cpf: cpf,
            message: message,
            created_at: new Date()
        }
    ])
}

async function getTransactionsFromCpf(cpf) {
    const { data, error } = await supabase.from('transactions').select('*').eq('cpf', cpf)

    return data
}

async function renderRegisterPage(req, res) {
    return new Promise(async (resolve, reject) => {
        try {

            const institutions = await getAllInstitutions()

            const courses = await getAllCourses()

            res.render('register', { institutions, courses })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

async function getAllInstitutions() {
    const { data } = await supabase.from('institutions').select('*')

    return data
}

async function getAllCourses() {
    const { data } = await supabase.from('courses').select('*')

    return data
}

async function renderStudentsPage(req, res) {
    return new Promise(async (resolve, reject) => {

        const { cpf, token } = req.cookies

        try {

            const { balance } = await getPersonById(token)

            const students = await getStudentFromTeacherCpf(cpf);

            res.render('students', { students, balance })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

async function renderPartnersPage(req, res) {
    return new Promise(async (resolve, reject) => {
        try {

            // Fazer isso aqui é errado, deveria ser chamado uma http request para partnerController
            const response = await getAllPartners();

            res.render('partners', { partners: response.partners })

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })

        }
    })
}

async function renderHomePage(req, res) {
    return new Promise(async (resolve, reject) => {
        const { user_role, token } = req.cookies

        try {

            res.render("home", { user_role });

            resolve({ status: 200 })

        } catch (error) {
            reject({ status: 500 })
        }
    })
}

async function listBenefits() {
    const { data } = await supabase.from('benefits').select('*')

    return data
}

async function renderUserBenefitsPage(req, res) {
    return new Promise(async (resolve, reject) => {
        const { token } = req.cookies
        try {
            const { balance } = await getPersonById(token)
            const benefits = await listBenefits()
            res.render('user-benefits', { benefits, balance })
            resolve({ status: 200 })
        } catch (error) {
            reject({ status: 500 })
        }
    })
}

async function getPartnerIdByCpf(cpf) {
    const { data } = await supabase.from('partner_reps').select('*').eq('cpf', cpf).single()

    return data.partner_id
}

async function getPersonByCpf(cpf) {
    const { data } = await supabase.from('person').select('*').eq('cpf', cpf).single()

    return data
}

async function getBenefitsByPartnerId(partnerId) {
    const { data } = await supabase.from('benefits').select('*').eq('partner_id', partnerId)

    return data
}

async function renderPartnerBenefitsPage(req, res) {
    return new Promise(async (resolve, reject) => {
        const { cpf, token } = req.cookies;

        try {
            const partnerId = await getPartnerIdByCpf(cpf);
            const benefits = await getBenefitsByPartnerId(partnerId);

            res.render('partner_benefits', { benefits });
            resolve({ status: 200 });
        } catch (error) {
            reject({ status: 500 });
        }
    });
}

async function getStudentFromTeacherCpf(teacherCpf) {
    const { data, error } = await supabase.from('teachers').select(`
        cpf,
        department_id,
        departments ( department_id, courses ( department_id, course_id, students ( course_id, cpf, person ( cpf, name, address, balance ))))
    `)
        .eq('cpf', teacherCpf).single()

    var students = []

    data.departments.courses.forEach(course => { course.students.forEach(student => { students.push(student.person) }) })

    return students
}

async function getPersonById(id) {
    const { data } = await supabase.from('person').select('*').eq('uuid', id).single()

    return data
}

async function isTeacher(cpf) {
    const { data, error } = await supabase.from('teachers').select('*').eq('cpf', cpf).single()

    return (data !== null ? true : false)
}

async function isPartnerRep(cpf) {
    const { data, error } = await supabase.from('partner_reps').select('*').eq('cpf', cpf).single()

    return (data !== null ? true : false)
}

async function logout(req, res) {
    return new Promise(async (resolve, reject) => {

        res.cookie('token', null, { expires: new Date(0) })
        res.cookie('name', null, { expires: new Date(0) })
        res.cookie('email', null, { expires: new Date(0) })
        res.cookie('address', null, { expires: new Date(0) })
        res.cookie('balance', null, { expires: new Date(0) })
        res.cookie('cpf', null, { expires: new Date(0) })
        res.cookie('rg', null, { expires: new Date(0) })
        res.cookie('institution_id', null, { expires: new Date(0) })
        res.cookie('user_role', null, { expires: new Date(0) })

        res.redirect('/')

        resolve({ status: 200 })
    })
}

async function login(req, res) {
    return new Promise(async (resolve, reject) => {
        const { email, senha } = req.body

        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            })

            const userInfo = await getPersonById(data.user.id)

            res.cookie('token', data.user.id)
            res.cookie('name', userInfo.name)
            res.cookie('cpf', userInfo.cpf)
            res.cookie('rg', userInfo.rg)
            res.cookie('address', userInfo.address)
            res.cookie('balance', userInfo.balance)
            res.cookie('institution_id', userInfo.institution_id)

            res.cookie('email', data.user.email)

            if (await isTeacher(userInfo.cpf)) {

                res.cookie('user_role', 'teacher')

            } else if (await isPartnerRep(userInfo.cpf)) {

                res.cookie('user_role', 'partner_rep')

            } else {

                res.cookie('user_role', 'student')
            }

            res.redirect('/app/home')
            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })
        }
    })
}

async function registerStudent(req, res) {
    return new Promise(async (resolve, reject) => {
        const { email, senha, nome, cpf, rg, endereco, instituicao, curso } = req.body

        try {

            const { data } = await supabase.auth.signUp({
                email: email,
                password: senha,
            })

            await supabase.from('person').insert([
                {
                    cpf: cpf,
                    email: email,
                    uuid: data.user.id,
                    name: nome,
                    address: endereco,
                    rg: rg,
                    balance: 0,
                }
            ]).select()

            await supabase.from('students').insert([
                {
                    cpf,
                    course_id: curso,
                    institution_id: instituicao,
                }
            ])

            resolve({ status: 200 })

        } catch (error) {

            reject({ status: 500 })
        }
    })
}

module.exports = {
    registerStudent,
    createNewTransaction,
    login,
    logout,
    
    getPartnerIdByCpf,
    getPersonByCpf,

    renderHomePage,
    renderPartnersPage,
    renderStudentsPage,
    renderRegisterPage,
    renderUserBenefitsPage,
    renderPartnerBenefitsPage,
    renderTransactionsPage,
}