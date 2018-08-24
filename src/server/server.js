const config = require('../configs/config.json');
const express = require('express');
const server = express();
const cors = require('cors');
const candidateRest = require('./rest-front/candidate-rest.front');
const companyRest = require('./rest-front/company.rest.front');
const path = require('path');

server.use(cors(config.CORS_OPTIONS));

server.use(express.static(__dirname + '../../../dist1/cv-pr-angular'));

candidateRest(server);
companyRest(server);

server.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname+'../../../dist1/cv-pr-angular/index.html'));
});

const port = process.env.PORT || config.PORT;
server.listen(port, console.log('listening'));
