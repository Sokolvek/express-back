const collection = require("../config")

class Auth {
    async createUser(req, res) {
        const data = {
            name: req.body.username,
            password: req.body.password
        }
        console.log(data)
        const existingUser = await collection.findOne({ name: data.name })
        if (existingUser) {
            return res.json("user already exists")
        }
        await collection.insertMany(data)
        res.render("login")
    }

    async getSignupPage(req, res) {
        res.render("signup")
    }

    async loginUser(req, res) {

        const { username, password } = req.body
        const data = {
            name: username,
            password: password
        }
        console.log(data)
        const userExists = await collection.findOne({ name: data.name, password: password })
        const users = await collection.find()
        if (!userExists) {
            return res.json("invalid login or password")
        }
        res.setHeader('Set-Cookie', 'isLoggedin=true');
        loggedIn = true
        console.log(loggedIn)
        res.render("home", { users: users })

    }

    async renderLogin(req, res) {
        res.render("login")
    }

    async logoutUser(req, res) {
        loggedIn = false
        res.clearCookie("isLoggedin")
        res.redirect("/login")
    }

    async renderHome(req,res){
        const users = await collection.find()
        console.log(loggedIn)
        res.render("home", {users:users})
    } 
    
}

module.exports = new Auth()