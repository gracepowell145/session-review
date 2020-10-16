module.exports = {
    login: (req,res) => {
        console.log('hit login', req.body)
        res.sendStatus(200)
    },
    register: (req,res) => {
        console.log('hit register')
        res.sendStatus(200)
    },
    logout: (req, res) => {
        console.log('hit logout')
        res.sendStatus(200)
    }
}