const { db } = require("./db");
const schema = require("./schema");
const { submissionsQueue } = require("./submission_queue/queue");

module.exports = {
  db,
  ...schema,
  submissionsQueue,
};
