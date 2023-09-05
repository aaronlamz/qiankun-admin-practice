const { port } = require("./config");
const devServer = {
  open: true,
  port: port,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  https: false,
  hotOnly: true,
};

module.exports = devServer;
