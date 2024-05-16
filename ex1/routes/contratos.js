var express = require('express');
var router = express.Router();
var CONTrato = require('../controllers/contratos')
var Contrato = require("../models/contratos")

/* GET /contratos: devolve uma lista com todos os registos; */
router.get('/', function (req, res) {
 console.log("entrou na página 1");
 var selectors = {};
 //GET /contratos?entidade=EEEE
 if (req.query.entidade) {
   console.log("esp", req.query.entidade)
     selectors.entidade_comunicante = req.query.entidade;
 }
 ////GET /contratos?tipo=AAA
 if (req.query.tipo){
     selectors.tipoprocedimento = req.query.tipo;
 }
 
 Contrato.find(selectors).then(function (contratos) {
   res.send(contratos);
 }).catch(err => { res.status(500).send(err) });
});

//GET GET /contratos/entidades
router.get('/entidades', function(req, res) {
    Contrato.distinct('entidade_comunicante', { entidade_comunicante: { $ne: "" } }).sort().then(function (p) {
    res.send(p);
})
   .catch(erro => res.jsonp(erro))
});

//GET GET /contratos/tipos
router.get('/tipos', function(req, res) {
    Contrato.distinct('tipoprocedimento', { tipoprocedimento: { $ne: "" } }).sort().then(function (p) {
    res.send(p);
})
   .catch(erro => res.jsonp(erro))
});


/* GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);*/
router.get('/:id', function(req, res) {
    console.log("id", req.params.id);
    
    CONTrato.findById(req.params.id)
      .then(data => {
       console.log("contrato ", data);
       res.send(data);
      })
      .catch(erro => res.jsonp(erro))
  });

/*POST /contratos: acrescenta um registo novo à BD; */
router.post('/', function(req, res) {
    CONTrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.jsonp(erro))
});


/* DELETE /contratos/:id: elimina da BD o registo com o identificador id*/
router.delete('/:id', function(req, res) {
    console.log("entrou para eliminar.... id ", req.params.id);
    CONTrato.remove(req.params.id)
        .then(() => {
            console.log("Deleted " + req.params.id);
            res.status(200).json({ message: "Contrato removido com sucesso" });
        })
        .catch(erro => res.status(500).jsonp(erro));
});

//PUT /contratos/:id: altera o registo com o identificador id.
router.put('/:id', function(req, res) {
    console.log("aqui", req.body);
    CONTrato.update(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  });


module.exports = router;

