const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", socket => {
  let nickname;
  io.emit("Hey! Welcome to my first chat! Type your nickname to continue...");
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", msg => {
    if (nickname) {
      io.emit("chat message", `${nickname} says ${msg}`);
    } else {
      nickname = msg;
    }
  });
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});
