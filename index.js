const express = require('express')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

let posts = [
    {
        id:"1a",
        username: "a",
        post: "hello a"
    },
    {
        id:"2b",
        username: "b",
        post: "hello b"

    },
    {
        id:"3c",
        username: "c",
        post: "hello c"

    }
]
app.get("/post/new", (req, res) => {
    res.render('new.ejs')
})
app.post('/post', (req, res)=>{
    const {username, post} = req.body;
    posts.push({username, post})
    res.redirect('/post');
})
app.get("/post", (req, res) => {
    res.render('index.ejs', { posts })
})
app.get("/post/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    console.log(post);
    res.render("show.ejs", {post})
})

app.get("/", (req, res) => {
    res.send("<h1>Responding</h1>")
})




const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})