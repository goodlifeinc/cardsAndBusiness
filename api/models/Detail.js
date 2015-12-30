/**
* Detail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    price : {type: 'float'},
    artNo : {type: 'string'},
    code : {type: 'string'},
    cbm : {type: 'float'},
    qtyInBox : {type: 'int'},
    product: {model: 'product', required: true},
    card: {model: 'card', required: true}
  }
};

