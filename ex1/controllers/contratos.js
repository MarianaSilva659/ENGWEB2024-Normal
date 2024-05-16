const mongoose = require('mongoose')
var Contrato = require("../models/contratos")

module.exports.list = () => {
    return Contrato
        .find()
        .sort({_id : 1})
        .exec()
}

module.exports.findById = id => {
    return Contrato
        .findOne({_id : id})
        .exec()
}

module.exports.insert = contrato => {
    if((Contrato.find({_id : contrato._id}).exec()).length != 1){
        var newContrato = new Contrato(contrato)
        return newContrato.save()
    }
}

module.exports.update = (id, contrato) => {
    return Contrato
        .findByIdAndUpdate(id, contrato, {new : true})
}

module.exports.remove = id => {
    return Contrato
        .findOneAndDelete({_id : id})
}
