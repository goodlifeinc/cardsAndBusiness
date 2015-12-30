/**
 * DetailController
 *
 * @description :: Server-side logic for managing details
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var rest = require('restler');
var moment = require('moment');

module.exports = {
  listAll: function(req, res) {

    rest.get(sails.config.baseApiRoute +'detail').on('complete', function(data) {
      _.each(data, function(item) {
        var createdAt = moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss");
        item.createdAt = createdAt;

      });
      return res.view({data: data});
    });
  },
  listOne: function(req, res) {
    rest.get(sails.config.baseApiRoute + 'detail/' + req.params.id).on('complete', function(data) {
      var createdAt = moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss");
      data.createdAt = createdAt;
      return res.view({item: data});
    })
  },
  addOne: function(req, res) {
    return res.view();
  },
  handleCreate: function(req, res) {
    if(req.body) {
      rest.postJson(sails.config.baseApiRoute + 'detail', req.body).on('complete', function(data, response) {
        if(response.statusCode == 201) {
          return res.redirect('/detail');
        }
        if(response.statusCode == 404) {
          return res.redirect('/404');
        }
      })
    }
  }
};
