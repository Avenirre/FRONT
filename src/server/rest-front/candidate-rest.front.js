const candidateRest = require('../rest-back/candidate-rest.back');
const restConfig = require('../../configs/rest.front');
const rest = require('../service/request.service');
const back = new candidateRest();

module.exports = (app) => {
  /**
   * returns json array of candidates
   */
  app.get(restConfig.getCandidates, (req, res) => {
    rest.fetchBackData(back.getCandidates, res);
  });

  app.get('/candidate/:id', (req, res) => {
    res.json([{message: 'succsess', candidateId: req.params.id}]);
  });
  app.get('/main', (req, res) => {
    res.render('../../../front/dist/cv-pr-angular/index.html');
  });
};