const restConfig = require('../../configs/rest.back');
const requestOptions = require('../templates/request-options.template');
const requestService = require('../service/request.service');

module.exports = class BackEnd {
  /**
   * get all candidates from back-end server
   * @returns {Promise<any>}
   */
  getCandidates() {
    const query = restConfig.getCandidates;
    const options = new requestOptions(restConfig.HOST, restConfig.PORT, query);
    return requestService.makeGetRequest(options);
  }
};

















