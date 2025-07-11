const {Queue} = require('bullmq');

const connection = { host: '127.0.0.1', port: 6379 };

const submissionsQueue = new Queue('submission_queue', {connection});

module.exports = {submissionsQueue};