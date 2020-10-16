const bcrypt = require('bcryptjs')
const saltRounds = 10

module.exports = {
    login: async (req, res) => {
        //get the db object
        const db = req.app.get('db')
        //deconstruct our req.body
        const { email, password } = req.body
        //check if user exisit in database with email
        let [userObj] = await db.check_for_user(email)
        //if email doesnt exist stop the function and indicate a 404 
        //404 = email not found 
        if (!userObj) return res.sendStatus(404)
        //password check
        const passCheck = bcrypt.compareSync(password, userObj.hash)
        if (!passCheck) return res.sendStatus(401)
        console.log({ passCheck })
        //set a user object on session
        req.session.user = {
            id: userObj.id,
            email
        }
        //check if req.session and req.session.user 
        //and then depending on if statement send back ok or bad request
        if (req.session && req.session.user) return res.sendStatus(200)
        else return res.sendStatus(400)
    },
    register: async (req, res) => {
        //get the db object
        const db = req.app.get('db')
        //deconstruct req.body
        const { email, password } = req.body
        // check if email already exists
        let [userObj] = await db.check_for_user(email)
        if (userObj) return res.sendStatus(400)
        //create the salt with saltrounds
        const salt = bcrypt.genSaltSync(saltRounds)
        //use the salt to hash your password with salt
        const hash = bcrypt.hashSync(password, salt)
        //create the new user with email and hash
        const [newUser] = await db.create_user(email, hash)
        //set user object with id and email on req.session
        req.session.user = {
            id: newUser.id,
            email
        }
        //double check that you have a session
        //send back ok or bad request
        if (req.session && req.session.user) return res.sendStatus(200)
        else return res.sendStatus(404)
    },
    logout: async (req, res) => {
        //use the destroy method on session
        await req.session.destroy()
        //use await to wait till after session is destroyed
        //then send back status code ok 
        //indicating that user is logged out
        res.sendStatus(200)
    },
    checkAuth: async (req, res) => {
        //check first for req.session then check for the user obj on session
        if (req.session && req.session.user) {
            //send back ok because req.session.user exisists
            res.sendStatus(200)
        } else {
            //req.session.user dosent exist so send back unauthorized
            res.sendStatus(401)
        }
    }
}