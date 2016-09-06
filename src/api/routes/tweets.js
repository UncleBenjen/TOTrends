var express = require('express');
var router = express.Router();
var request = require("request");

/*
var Twitter = require('twitter');
var twitterConfig = require('../../../twitter.config');

var twitterClient = new Twitter(twitterConfig);
*/
import twitterClient from '../controllers/twitter'

function getTweets(q, result_type = 'recent', count='15', max_id, geocode="43.6532,79.3832,50km", until, cb) {

    twitterClient.get('search/tweets', {q: q, result_type: result_type, count: count, max_id: max_id, geocode: null, until: until, include_entities: true }, function(error, trends, response){
      //if(error) throw error;
      //console.log(trends);  // The favorites. 
      //console.log(response);  // Raw response object. 
      cb(error, trends)
    });
}


router.get('/', function(req, res) {

  var q = req.query['trend']                  || null;
  var result_type = req.query['result_type']  || null;
  var count = req.query['count']              || null;
  var max_id = req.query['max_id']            || null;
  var radius = req.query['radius']            || null;
  var until = req.query['until']              || null;

  var geocode = null;

  if(radius){
    geocode = "43.6532,79.3832,"+radius+"km";
  }

  //console.log(q)
  
  try{
    getTweets(q, result_type, count, max_id, geocode, until, function (error, data) {
      
      if (error) {
        console.log(error);
        res.json( { message: "The Twitter API has returned an Error. Please try again and don't forget that I'm a great programmer."} )
      }
      else{
        res.json( data["statuses"] )
      }

      
    })
  }catch(e){
    res.status(500).json({ message: "Yeeeeaah something broke... Like REALLY broke. Try again, or maybe don't." })
  }

});

module.exports = router;
