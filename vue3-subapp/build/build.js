const { exec } = require("child_process");
const projects = process.argv.slice(2);

projects.forEach(() => {
  let workerProcess = exec(
    `vue-cli-service build`,
    { maxBuffer: 1024 * 1024 * 10 },
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
  workerProcess.stdout.on("data", function (data) {
    console.log(data);
  });
});
