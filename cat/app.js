var express = require('express')

const serverCount = 10
const basePort = 3001

//start content servers
for (var i = 0; i < serverCount; i++) {
    startContentServer(basePort + i)
}

//dispatcher

var offset = 0;

var app = express()

app.get("/", (req, res) => {

    var url = `http://localhost:${basePort + offset}/now.flv`;
    console.log(`redirect to ${url}`)
    res.redirect(url)

    offset++
    offset %= serverCount
})

app.listen(3000, () => {
    console.log(`dispathcer on port ${3000}`)
})

//...
function startContentServer(port) {
    var app = express()

    app.use(express.static("public"))

    app.listen(port, () => {
        console.log(`video server on port ${port}`)
    })
}