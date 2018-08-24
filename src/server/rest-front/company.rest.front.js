const companyRest = require('../rest-back/company-rest.back');
const restConfig = require('../../configs/rest.front');
const rest = require('../service/request.service');
const back = new companyRest();

module.exports = (app) => {
  /**
   * returns json array of companies
   */
  app.get(restConfig.getCompanies, (req, res) => {
    rest.fetchBackData(back.getCompanies, res);
  });
};

