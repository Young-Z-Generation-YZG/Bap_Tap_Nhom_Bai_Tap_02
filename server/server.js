process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const server = require("./src/app");
const {
  app: { port },
} = require("./src/config/env.config");

const PORT = port || 3000;

server.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
