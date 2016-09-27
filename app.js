var express = require('express');
var app = express();
app.use(express.static('public'));
var fs = require('fs');
var path = require('path');
var fileData = fs.readFileSync('./data.json');
var fileData = JSON.parse(fileData);
function sortByProp(arr, key){
	return arr.sort(function(a,b){
		if(typeof a[key] === 'number'){
			return a[key] - b[key];
		}else{
			return (a[key] > b[key]) ? 1 : (a[key] < b[key]) ? -1 : 0;	
		}
	});
}
var groups = {};
var sortBySymbol = sortByProp(fileData.trades, 'Symbol');
sortBySymbol.forEach(function(item){
	if(groups[item['Symbol']] === undefined){
		groups[item['Symbol']] = {};
	}
	if(groups[item['Symbol']][item['Action']] === undefined){
		groups[item['Symbol']][item['Action']] = [];
	}
	groups[item['Symbol']][item['Action']].push(item);
});
for(var i in groups){
	for(var j in groups[i]){		
		var sortedArray = sortByProp(groups[i][j], 'TxnId');
		groups[i][j] = sortedArray;
	}
}
try{
	fs.writeFileSync('./public/sortedData.json', JSON.stringify(groups), 'utf-8');
}catch(e){
	console.log('got an execption in writing file');
	console.log('exception is : ', e);
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./','index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});