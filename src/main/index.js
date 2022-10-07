const setServiceCount = require("./setServiceCount");

async function run() {
  await setServiceCount();
}

module.exports = run;

if (require.main === module) {
  run();
}
