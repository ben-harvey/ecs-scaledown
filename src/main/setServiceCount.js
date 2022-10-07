const core = require("@actions/core");
const aws = require("aws-sdk");

async function run() {
  const service =
    core.getInput("service") || `gh-runner-${core.getInput("repository-hash")}`;
  const cluster =
    core.getInput("cluster") || `gh-runner-${core.getInput("repository-hash")}`;
  const desiredCount = core.getInput("desired-count", { required: true });
  core.debug(`Desired count: ${desiredCount}`);
  console.log(`Desired count: ${desiredCount}`);
  try {
    if (service === "gh-runner-" && cluster === "gh-runner-") {
      core.setFailed("You must specify a service and a cluster");
    }
    if (service === "gh-runner-") {
      core.setFailed("You must specify a service");
    }
    if (cluster === "gh-runner-") {
      core.setFailed("You must specify a cluster");
    }
    const ecs = new aws.ECS({
      customUserAgent: "setServiceCount",
    });
    try {
      const updateServiceResponse = await ecs
        .updateService({ service, cluster, desiredCount })
        .promise();
      core.debug(updateServiceResponse);
      console.log(updateServiceResponse);
    } catch (error) {
      core.setFailed("Failed to update service in ECS: " + error.message);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
