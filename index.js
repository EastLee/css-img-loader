/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");

	var query = loaderUtils.parseQuery(this.query);
	var configKey = query.config || "fileLoader";
	var options = this.options[configKey] || {};

	var config = {
		publicPath: false,
		outputPath: false,
		name: "[hash].[ext]"
	};

	// options takes precedence over config
	Object.keys(options).forEach(function(attr) {
		config[attr] = options[attr];
	});

	// query takes precedence over config and options
	Object.keys(query).forEach(function(attr) {
		config[attr] = query[attr];
	});
	// console.info(config);
	var url = loaderUtils.interpolateName(this, config.name, {
		context: config.context || this.options.context,
		content: content,
		regExp: config.regExp
	});

	var publicPath = "__webpack_public_path__ + " + JSON.stringify(url);
	// console.info(config);
	if (config.publicPath) {
		// support functions as publicPath to generate them dynamically
		publicPath = JSON.stringify(
				typeof config.publicPath === "function"
				 ? config.publicPath(url)
				 : config.publicPath + url
		);
	}
	var _path = config.outputPath;
	if(_path){
		var arr = url.split('/');
		var _named = arr[arr.length-1];
		url = (_path.substr(-1)==='/'||_path.substr(-1)==='\\')?_path+_named:_path+_path.substr(-1)+_named;
	}
	if (query.emitFile === undefined || query.emitFile) {
		this.emitFile(url, content);
	}

	return "module.exports = " + publicPath + ";";
}
module.exports.raw = true;
