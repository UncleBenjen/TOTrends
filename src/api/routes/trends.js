var express = require('express');
var router = express.Router();
var request = require("request");

/*
var Twitter = require('twitter');
var twitterConfig = require('../../../twitter.config');

var twitterClient = new Twitter(twitterConfig);
*/
import twitterClient from '../controllers/twitter'

function getTrends(woeid, cb) {

    twitterClient.get('trends/place', {id: woeid}, function(error, trends, response){
      //if(error) throw error;
      //console.log(trends);  // The favorites. 
      //console.log(response);  // Raw response object. 
      cb(error, trends)
    });
}


router.get('/', function(req, res) {

  var woeid = req.query['place'] || 4118;

  //woeid = 4118;
  
  try{
    getTrends(woeid, function (error, data) {
      

      if (error) {
        console.log(error);
        res.json( { message: "The Twitter API has returned an Error. Please try again and don't forget that I'm a great programmer and none of this could possibly be my fault..."} )
      }
      else{
        res.json( data[0]["trends"] )
      }

      
    })
  }catch(e){
    res.status(500).json({ message: "Yeeeeaah something broke... Like REALLY broke. Try again, or maybe don't." })
  }

});

module.exports = router;
