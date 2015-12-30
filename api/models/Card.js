/**
* Card.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    number : {type: 'string', unique: true},
    company: {type: 'string', unique: true},
    telephone : {type: 'string'},
    mobile : {type: 'string'},
    qq : {type: 'string'},
    skype : {type: 'string'},
    linkToDrive : {type: 'string'},
    details : {collection: 'Detail', via : 'card'}
  },
  //beforeCreate: function (values, cb) {
  //  if(values.number || values.company) {
  //    console.log(values.number);
  //    console.log(values.company);
  //    cb();
  //  }else{
  //    var err = new Error();
  //    err.statusCode = 400;
  //    err.message = "Number or company";
  //    cb(err);
  //  }
  //}
};

