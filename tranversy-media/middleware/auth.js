module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            res.redirect("/")
        }
    },
    enusreGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/dashboard")
        }
        else {
            return next()

        }
    }
}