const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload')
//store "public" folder's path to this variable
let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileUpload());
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "./HTMLS/index.html"));

})
//.............................................................................................
app.get('/create', (req, res) => {
    res.sendFile(path.join(initial_path, "./HTMLS/create.html"))

})
//....................................................................................................
//upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();

    //image name
    let imageName = date.getDate() + date.getTime() + file.name;

    //image upload path
    let path = 'public/uploads/' + imageName;

    //create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            //our image upload path
            res.json(`uploads/${imageName}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "./HTMLS/blog.html"))
})

app.use((req, res) => {
    res.json("404")
})

const port = 3000
app.listen(port)