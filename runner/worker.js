const { Worker } = require("bullmq");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const connection = { host: "127.0.0.1", port: 6379 };
const CONTAINER_NAME = "worker";
const submissionsDir = path.join(__dirname, "submissions");

require("dotenv").config({ path: path.join(__dirname, "../frontend/.env.local") });

if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir, { recursive: true });
}

const workerQueue = new Worker(
  "submission_queue",
  async (job) => {
    const inputPath = path.join(submissionsDir, "input.json");
    const outputPath = path.join(submissionsDir, "output.json");

    fs.writeFileSync(inputPath, JSON.stringify(job.data));
    execSync(`docker start ${CONTAINER_NAME}`);
    execSync(
      `docker cp ${inputPath} ${CONTAINER_NAME}:/app/input/input.json`
    );
    execSync(`docker exec ${CONTAINER_NAME} node dockerRunner.js`);
    execSync(
      `docker cp ${CONTAINER_NAME}:/app/output/output.json ${outputPath}`
    );

    const output = fs.readFileSync(outputPath);
    const { results } = JSON.parse(output);
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    let status = "Accepted";
    let ress = null;

    for (let result of results) {
      if (result.terminationFlag == "timeLimitExceeded") {
        status = "Time Limit Exceeded";
        ress = result;
        break;
      } else if (result.terminationFlag == "memoryLimitExceeded") {
        status = "Memory Limit Exceeded";
        ress = result;
        break;
      } else if (result.terminationFlag == "runtimeError") {
        status = "Runtime Error";
        ress = result;
        break;
      } else if (result.terminationFlag == "wrongAnswer") {
        status = "Wrong Answer";
        ress = result;
        break;
      }
    }

    ress = JSON.stringify(ress);

    await axios.post(`${process.env.BASE_URL}/api/log_submission`, {
      submissionId: job.data.submissionId,
      userId: job.data.userId,
      problemId: job.data.problemId,
      code: job.data.code,
      status: status.toLowerCase(),
      result: ress,
    });
  },
  {
    connection,
    concurrency: 1,
    settings: {
      retryProcessDelay: 1000,
    },
    limiter: {
      max: 5,
      duration: 1000,
    },
  }
);
