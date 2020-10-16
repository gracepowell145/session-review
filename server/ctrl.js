module.exports = {
    login: (req,res) => {
        console.log('hit login', req.body)
        res.sendStatus(200)
    },
    register: (req,res) => {
        console.log('hit register')
        res.sendStatus(200)
    },
    logout: async (req, res) => {
        console.log('hit logout')
        await req.session.destroy()
        res.sendStatus(200)
    },
    checkAuth: async (req,res,next) => {
        if(req.session && req.session.user){
            res.sendStatus(200)
        }else {
            res.sendStatus(401)
        }
    }
}