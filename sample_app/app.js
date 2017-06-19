var minpress = require("../lib/minpress")

var app = minpress()

app.get("/", function(req, res) {
  res.send("This is the homepage")
})

app.listen(4000)
