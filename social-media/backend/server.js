const server = require("./server-testable");
const port = 3000;
server.listen(port, () => {
  console.log("Server is running on port: " + port);
})