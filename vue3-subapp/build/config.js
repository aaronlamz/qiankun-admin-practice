const { name } = require("../package.json");
const port = 8085;
const IS_PRO = process.env.NODE_ENV === "production";
const config = {
  port,
  IS_PRO,
  publicPath: IS_PRO ? `/admin/${name}/` : `//localhost:${port}`,
};
module.exports = config;
