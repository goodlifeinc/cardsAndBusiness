/**
 * CardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');
var rest = require('restler');

module.exports = {

	listAll: function(req, res) {

    rest.get('http://localhost:1337/api/card').on('complete', function(data) {
      _.each(data, function(item) {
        var createdAt = moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss");
        item.createdAt = createdAt;

      });
      return res.view({data: data});
    });
  },
  listOne: function(req, res) {
    var id = req.params.id;

    Card.findOne({id:req.params.id}).populate('details')
      .then(function(cardData) {
        var createdAt = moment(cardData.createdAt).format("DD/MM/YYYY HH:mm:ss");
        cardData.createdAt = createdAt;
        return cardData;
      })
      .then(function(data) {
        data.details.map(function(detail, i) {
          var product = Product.findOne({id:detail.id});
          data.details[i].fullProduct = product;
        })
        return data;
      })
      .then(function(data) {
        console.log(data);
        return res.view({item: data});
      })

    //rest.get('http://localhost:1337/api/card/' + req.params.id)
    //  .on('complete', function(data) {
    //    var createdAt = moment(data.createdAt).format("DD/MM/YYYY HH:mm:ss");
    //    data.createdAt = createdAt;
    //    data.details.map(function(detail) {
    //      console.log("detail about " + data.id);
    //      rest.get(sails.config.baseApiRoute + 'product/' + detail.product)
    //        .on('complete', function(product) {
    //          console.log("ot produkta");
    //          detail.fullProduct = product.name;
    //        })
    //      console.log("ot detaila");
    //    })
    //    return res.view({item: data})
    //  })
  },
  addOne: function(req, res) {
    return res.view();
  },
  handleCreate: function(req, res) {
    if(req.body) {
      rest.postJson('http://localhost:1337/api/card', req.body).on('complete', function(data, response) {
        if(response.statusCode == 201) {
          return res.redirect('/card');
        }
        if(response.statusCode == 404) {
          return res.redirect('/404');
        }
      })
    }
  }
};

