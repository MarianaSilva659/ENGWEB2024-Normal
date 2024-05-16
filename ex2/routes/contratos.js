var express = require('express');
var router = express.Router();
var CONTrato = require('../controllers/contratos')
var Contrato = require("../models/contratos")

/* GET /: devolve uma lista com todos os registos; */
router.get('/', function (req, res) {
 var selectors = {};
 Contrato.find(selectors).then(function (contratos) {
    res.render('pagContratos', { title: 'Registo de todos os Contratos',  lista: contratos});
}).catch(err => { res.status(500).send(err) });
});


/* GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);*/
router.get('/:id', function(req, res) {
    console.log("id", req.params.id);
    CONTrato.findById(req.params.id)
      .then(data => {
       console.log("contrato ", data);
       res.render('espContrato', {contrato: data});
      })
      .catch(erro => res.jsonp(erro))
  });


router.get('/entidades/:id', function(req, res) {
    var selectors = {};
    var totalValorContratos = 0;
    selectors.NIPC_entidade_comunicante = req.params.id;
    Contrato.find(selectors).then(function (contratos) {

        contratos.forEach(function(contrato) {
            totalValorContratos += parseFloat(contrato.precoContratual);
        });

      var nomeEntidade = contratos[0].entidade_comunicante;
      res.render('pagEntidades', { nome: req.params.id, entidade: nomeEntidade,  lista: contratos, valorContratos: totalValorContratos});
  
    }).catch(err => { res.status(500).send(err) });
  });
  



module.exports = router;

