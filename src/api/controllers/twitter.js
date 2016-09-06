var Twitter = require('twitter');
var twitterConfig = require('../../../twitter.config');

var twitterClient = new Twitter(twitterConfig);

export default twitterClient