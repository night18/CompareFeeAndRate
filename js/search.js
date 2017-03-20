
$(document).ready(function(){
	var orderCard;
	var MXNUSD = 0;

	var setRate = function(data) {
	  fx.rates = data.rates;
	  MXNUSD = fx(1).from("USD").to("MXN");
	  console.log(MXNUSD);
	}

	$.getJSON("https://api.fixer.io/latest", setRate);

	$("#search").click(function(){
		var amount_send = $("#amount_send").val();
		// var MXNUSD = 19.0708673;

		if(! $.isNumeric(amount_send) || amount_send <= 0){
			alert("Please input a positive number");
			return false;
		}
		if (MXNUSD == 0){
			alert("There are some error about exchange rate, please contact HCI@WVU Lab");
		}

		var container = $("#Container");
		container.empty();

		var mixer = container.mixItUp();
		orderCard = [];

		$.getJSON("js/rate.json",function(data){


			$.each(data.option, function(i,value){
				var card = $("<div/>",{'class': "filimg mix col-md-4 col-sm-4 col-xs-12 card"});
				var cardName = $("<h3/>");
				var cardTable = $("<table/>",{'class':"card_table"});
				var payment_row = $("<tr/>",{'class':"card_row"});
				var payment_label = $("<td/>",{'class':"card_cell"}).text("Payment Method");
				var payment_cell = $("<td/>",{'class':"card_cell"});
				var receive_row = $("<tr/>",{'class':"card_row"});
				var receive_label = $("<td/>",{'class':"card_cell"}).text("Receive Method");
				var receive_cell = $("<td/>",{'class':"card_cell"});
				var time_row = $("<tr/>",{'class':"card_row"});
				var time_label = $("<td/>",{'class':"card_cell"}).text("Transfer Speed");
				var time_cell = $("<td/>",{'class':"card_cell"});
				var percent_row = $("<tr/>",{'class':"card_row"});
				var percent_label = $("<td/>",{'class':"card_cell"}).text("Total Cost(%)");
				var percent_cell = $("<td/>",{'class':"card_cell"});
				var usdcost_row = $("<tr/>",{'class':"card_row"});
				var usdcost_label = $("<td/>",{'class':"card_cell"}).text("Total Cost(USD)");
				var usdcost_cell = $("<td/>",{'class':"card_cell"});
				var mxnget_row = $("<tr/>",{'class':"card_row"});
				var mxnget_label = $("<td/>",{'class':"card_cell"}).text("You get (MXN):");
				var mxnget_cell = $("<td/>",{'class':"card_cell"});


				if(value.hasOwnProperty('name')){
					cardName.text(value.name);
				}

				if(value.hasOwnProperty('payment')){
					jQuery.each(value.payment,function(index, method){
						switch(method){
							case 1:
								card.addClass("category-1");
								payment_cell.append("Bank Account ");
							break;
							case 2:
								card.addClass("category-2");
								payment_cell.append("Debit Card ");
							break;
							case 3:
								card.addClass("category-3");
								payment_cell.append("Cash ");
							break;
						}
					});
				}
				if(value.hasOwnProperty('receive')){
					jQuery.each(value.receive,function(index, method){
						switch(method){
							case 1:
								card.addClass("category-4");
								receive_cell.append("Bank Account ");
							break;
							case 3:
								card.addClass("category-5");
								receive_cell.append("Cash ");
							break;
						}
					});
				}

				if(value.hasOwnProperty('time')){
					
					switch(value.time){
						case 1:
							time_cell.append("Less than 1 hour ");
						break;
						case 2:
							time_cell.append("Same day ");
						break;
						case 3:
							time_cell.append("Next day");
						break;
						case 4:
							time_cell.append("Two day ");
						break;
						case 5:
							time_cell.append("3~5 day ");
						break;
					}
				}

				var usdFee;

				if(value.hasOwnProperty('fee') && value.hasOwnProperty('rate')){
					
					usdFee = amount_send * value.rate / 100 + value.fee;
					var percentFee = usdFee / amount_send;
					percent_cell.append((percentFee * 100).toFixed(2));
					usdcost_cell.append("$"+usdFee.toFixed(2));
					card.attr("data-price", usdFee);
					mxnget_cell.append(((amount_send-value.fee) *MXNUSD*(100-value.rate)/100).toFixed(2) );
				}

				payment_row.append(payment_label).append(payment_cell);
				receive_row.append(receive_label).append(receive_cell);
				time_row.append(time_label).append(time_cell);
				percent_row.append(percent_label).append(percent_cell);
				usdcost_row.append(usdcost_label).append(usdcost_cell);
				mxnget_row.append(mxnget_label).append(mxnget_cell);
				cardTable.append(payment_row).append(receive_row).append(time_row).append(percent_row).append(usdcost_row).append(mxnget_row);


				card.append(cardName);
				card.append(cardTable);

				// container.append(card);

				orderCard.push([usdFee,card]);
				
			});

			function sortFunction(a,b){
				if(a[0] === b[0]){
					return 0;
				}
				else{
					return(a[0] < b[0])? -1:1;
				}
			}

			orderCard.sort(sortFunction);

			for(var i = 0; i < orderCard.length; i++){
				container.mixItUp('insert', i ,orderCard[i][1], {filter: "all"});
			}
			
			
			$('html,body').animate({scrollTop:$("#table").offset().top},800);
		});
	})
});

