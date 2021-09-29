const { ensureAuth } = require("../middleware/auth")
const Story = require("../Modals/Story")
const storiesRouter = require("express").Router()


storiesRouter.get("/add", ensureAuth, (req, res) => {
    res.render("stories/add")
})
storiesRouter.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
        res.render("error/500")
    }
})
storiesRouter.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public',
        })
            .populate('user')
            .lean()

        res.render('stories/index', {
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
storiesRouter.get("/:id", ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate("user")
            .lean()
        if (!story) {
            return res.render("error/404")
        }
        res.render("stories/show", {
            story
        })
    } catch (error) {
        console.log(error)
        res.render("error/500")
    }
})

storiesRouter.put("/:id", ensureAuth, async (req, res) => {
    let story = await Story.findById(req.params.id).lean()

    if (!story) {
        return res.render("error/404")
    }
    if (story.user != req.user.id) {
        res.redirect("/stories")

    }
    else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })
        res.redirect("/dashboard")
    }

})


storiesRouter.delete("/:id", ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect("/dashboard")
    } catch (error) {
        console.log(error)
        return res.render('error/500')

    }
})


storiesRouter.get("/edit/:id", ensureAuth, async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean()
    if (!story) {
        return res.render("error/404")
    }
    if (story.user != req.user.id) {
        res.redirect("/stories")

    }
    else {
        res.render("stories/edit", {
            story,
        })
    }
})

storiesRouter.get("/", ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: "public" })
            .populate("user")
            .sort({ createdAt: "desc" })
            .lean()

        res.render("stories/index", {
            stories
        })
    } catch (err) {
        console.log(err)
        res.render("error/500")

    }
})

module.exports = storiesRouter