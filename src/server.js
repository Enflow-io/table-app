const express = require('express');
const request = require('request')
const path = require('path');
const config = require('./config.json')
const app = express();

function doRequest(options) {
	return new Promise(function (resolve, reject) {
		request(options, function (error, res, body) {
			if (!error && res.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}


const options = {
	uri: null,
	auth: {
		user: config.credentials.login,
		pass: config.credentials.password,
		sendImmediately: false
	}
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/columns', async function (req, res) {
	let result = await doRequest({...options, uri: config.columnsSource})
	res.setHeader('Content-Type', 'application/json');
	return res.end(result);
});


app.get('/data', async function (req, res) {
	let result = await doRequest({...options, uri: config.dataSource})
	res.setHeader('Content-Type', 'application/json');
	return res.end(result);
});



app.listen(process.env.PORT || 3001);
