const { exec } = require("child_process");
const yargs = require("yargs");
const argv = yargs.argv;
const proxyEnv = argv.proxy || "uat";

let workerProcess = exec(
  `vue-cli-service serve --proxy=${proxyEnv}`,
  {
    maxBuffer: 1024 * 1024 * 10 * 10,
  },
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
workerProcess.stdout.on("data", function (data) {
  console.log(data);
});
