const http = require('http');

/**
 * makes get request with given parameters
 * @param options
 * @returns {Promise}
 */
module.exports.makeGetRequest = function (options) {
  return new Promise(
    (resolve, reject) => {
      let output = '';
      http.get(options, (res) => {
        res.on('data',
          (chunk) => {
            output += chunk;
          })
          .on('end',
            () => {
              let receivedObject = JSON.parse(output);
              resolve(receivedObject);
            })
          .on('error',
            (error) => {
              reject(error);
            });
      });
    }
  );
}
;
/**
 * handles Promise data from back-end server and returns it to front
 * @param handler
 * @param res
 */
module.exports.fetchBackData = function (handler, res) {
  handler().then(
    (resolve) => {
      res.json(resolve);
    }).catch(
    (error) => {
      res.send(new Error(error));
    });
};