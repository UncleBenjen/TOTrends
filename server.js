require('babel-core/register');
require('css-modules-require-hook/preset');

var env = process.env.NODE_ENV || 'production'

if(env === 'production'){
	var app = require("./serverProd.js");
} else {
	var app = require("./serverDev.js");
}
