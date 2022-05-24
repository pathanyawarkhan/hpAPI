const express = require("express")
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 8000
const mongo = require("./db/conn")

app.post("/adddata", async (req, res) => {
    const projectTitle = req.body.projectTitle
    const projectDescription = req.body.projectDescription
    const appstore_link = req.body.appstore_link
    const playstore_link = req.body.playstore_link
    const website_link = req.body.website_link
    const front_end_techstack = req.body.front_end_techstack
    const back_end_techstack = req.body.back_end_techstack
    const screenshotsVideos = req.body.media


    if (typeof projectTitle !== "string") {
        return res.send({ error: "projectTitle must be in string." })
    }

    if (typeof projectDescription !== "string") {
        return res.send({ error: "projectDescription must be in string." })
    }

    if (typeof appstore_link !== "string") {
        return res.send({ error: "appstore_link must be in string." })
    }

    if (typeof playstore_link !== "string") {
        return res.send({ error: "playstore_link must be in string." })
    }

    if (typeof website_link !== "string") {
        return res.send({ error: "website_link must be in string." })
    }

    if (!(front_end_techstack || back_end_techstack)) {
        return res.send({ error: "techstack can not be null or undefined." })
    }

    if ((typeof front_end_techstack || typeof back_end_techstack) !== "object") {
        return res.send({ error: "techstack value must be in array." })
    }

    if (!screenshotsVideos || typeof screenshotsVideos !== "string") {
        return res.send({ error: "screenshots / videos must be in string & can not be null or undefined." })
    }

    const insData = await mongo.db("hp").collection("data").insertOne({
        projectTitle, projectDescription, appstore_link, playstore_link, website_link, front_end_techstack, back_end_techstack, media: screenshotsVideos
    })
    res.send({ msg: "data inseted successfully.", insData })
    res.end()
})

app.listen(8000, () => {
    console.log(`Server running on port ${port}`);
})