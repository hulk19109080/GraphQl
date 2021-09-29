const auth = require("../middleware/auth")
const Story = require("../Modals/Story")
const router = require("express").Router()

router.get("/", auth.enusreGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})
router.get("/dashboard", auth.ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})



module.exports = router