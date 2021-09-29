const authrouter = require("express").Router()
const passport = require("passport")


authrouter.get("/google", passport.authenticate('google', { scope: ["profile"] }))
authrouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard")
})


authrouter.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = authrouter