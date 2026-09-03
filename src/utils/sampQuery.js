const sampQuery = require('samp-query');

function queryServer() {
  return new Promise((resolve, reject) => {
    const timeout = Number(process.env.SAMP_QUERY_TIMEOUT || 2000);
    sampQuery({ host: process.env.SAMP_IP, port: Number(process.env.SAMP_PORT || 7777), timeout }, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
module.exports = { queryServer };
