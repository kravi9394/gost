function calculateProfit(order){
	var sellTxn = {};
	var buyTxn = {};	
	
	for(var i = 0 , len = order['Buy'].length; i < len; i++){
		buyTxn[order['Buy'][i].TxnId] = order['Buy'][i];
	}
	
	for(var i = 0 , len = order['Sell'].length; i < len; i++){
		sellTxn[order['Sell'][i].TxnId] = order['Sell'][i];
	}
	
	var stxns = Object.keys(sellTxn);
	if(stxns.length > 0){
		for(var i = 0, len = stxns.length ; i < len ; i++){			
			var btxns = Object.keys(buyTxn);
			var buys = btxns.filter(function(item){
				if(Number(item) < Number(stxns[i])){
					return true;
				}else{
					return false;
				}
			});
		}
		/*if(btxns.length > 1){
			
		}else{
			var bcost = buyTxn[btxns[0]].Price * buyTxn[btxns[0]].Quantity;
			var scost = '';
		}*/
	}
	return 0;
}
function onReady(){
	var tableData = $('#tableData').html('');	
	$.ajax({
		url : 'sortedData.json',
		success : function(data){
			for(var i in data){
				var groupRow = $('<tr><td colspan="6" class="text-info"><strong>' + i + '</strong></td><tr>');
				tableData.append(groupRow);
				for(var j in data[i]){
					var groupedItem = $('<tr><td colspan="6"><strong>' + j + '</strong></td><tr>');
					tableData.append(groupedItem);
					for(var k = 0, len = data[i][j].length ; k < len; k++){
						var tr = $('<tr></tr>');
						var empty = $('<td></td>');
						var id = $('<td>' + data[i][j][k].TxnId + '</td>');
						var qty = $('<td>' + data[i][j][k].Quantity + '</td>');
						var price = $('<td>' + data[i][j][k].Price + '</td>');
						var mktvalue = $('<td>' + data[i][j][k].MarketValue + '</td>');
						if(j.trim().toLowerCase() == 'buy'){
							var profit = $('<td>0</td>');
						}else{
							var profit = $('<td>' + calculateProfit(data[i]) + '</td>');
						}
						tr.append(empty).append(id).append(qty).append(price).append(mktvalue).append(profit);
						tableData.append(tr);
					}
				}
			}
		},
		error : function(){
			alert('an error occurred while fetching sorted data');
		}
	})
}
$(document).ready(onReady);