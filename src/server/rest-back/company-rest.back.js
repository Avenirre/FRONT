const restConfig = require('../../configs/rest.back');
const requestOptions = require('../templates/request-options.template');
const requestService = require('../service/request.service');

module.exports = class BackEnd {
  /**
   * get all companies from back-end server
   * @returns {Promise<JSON>}
   */
  getCompanies() {
    const query = restConfig.getCompanies;
    const options = new requestOptions(restConfig.HOST, restConfig.PORT, query);
    return requestService.makeGetRequest(options);
  }
};

















