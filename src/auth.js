//var digest = require('http-digest-client')('forTest', 'nC.FAbYT-o7d2Aa86Vpv');
var request = require('request')
var options = {
	uri: 'http://marklogic.axes.pro:8022/LATEST/resources/getScheme',
	auth: {
		user: 'forTest',
		pass: 'nC.FAbYT-o7d2Aa86Vpv',
		sendImmediately: false
	}
};
request(options, function(error, response, body){
	if (!error && response.statusCode == 200){
		console.log('body : ' + body)
	}
	else{
		console.log('Code : ' + response.statusCode)
		console.log('error : ' + error)
		console.log('body : ' + body)
	}
});
