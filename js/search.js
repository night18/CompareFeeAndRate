
$(document).ready(function(){
	var orderCard = [];
	var index = 0;

	// var MXNUSD = 0;
	// var setRate = function(data) {
	//   fx.rates = data.rates;
	//   MXNUSD = fx(1).from("USD").to("MXN");
	//   console.log(MXNUSD);
	// }
	// $.getJSON("https://api.fixer.io/latest", setRate);

	var container = $("#Container");
	var mixer = container.mixItUp();
	/*Amount you send from USD, which excludes the transaction fee*/
	var amount_send;


	var confirmListener = function(id){
		amount_send = $("#amount_send").val();
		if(! $.isNumeric(amount_send) || amount_send <= 0){
			$('html,body').animate({scrollTop:$("#banner").offset().top},800);
			alert("Please input a positive number in the 'sending amount' field before setting options");
			return false;
		}

		var name = $("#"+id+"_name").val();
		var fee = $("#"+id+"_fee").val();
		var rate = $("#"+id+"_rate").val();

		if(!name){
			alert("Please input an option name");
			return false;
		}

		if(! $.isNumeric(fee)){
			alert("Please input a number in the 'Transaction Fee' field");
			return false;
		}

		if(! $.isNumeric(rate) || rate <= 0){
			alert("Please input a positive number in the 'Exchange Rate' field");
			return false;
		}
		container.empty();
		orderCard = [];
		
		var card = $("<div/>",{'class': "filimg mix col-md-4 col-sm-4 col-xs-12 card category-1"});
		var cardName = $("<h3/>").text(name);
		var cardTable = $("<table/>",{'class':"card_table"});
		var mxnget_row = $("<tr/>",{'class':"card_row"});
		var mxnget_label = $("<td/>",{'class':"card_cell"});
		var mxnget_label_h3 = $("<h3/>").text("Remittee gets (MXN):");
		var mxnget_cell = $("<td/>",{'class':"card_cell"});
		var mxnget_cell_h3 = $("<h3/>");
		var mxnget_cell_b = $("<b/>");
		var actrate_row = $("<tr/>",{'class':"card_row"});
		var actrate_label = $("<td/>",{'class':"card_cell"});
		var actrate_label_h3 = $("<h3/>").text("Actual Rate");
		var actrate_cell = $("<td/>",{'class':"card_cell"});
		var actrate_cell_h3 = $("<h3/>");
		var actrate_cell_b = $("<b/>");
	
		var mxnGet = amount_send * rate;
		var actRate = mxnGet/(amount_send+fee);

		mxnget_label.append(mxnget_label_h3);
		mxnget_cell_b.text(mxnGet.toFixed(2));
		mxnget_cell_h3.append(mxnget_cell_b);
		mxnget_cell.append(mxnget_cell_h3);
		actrate_label.append(actrate_label_h3);
		actrate_cell_b.text(actRate.toFixed(2));
		actrate_cell_h3.append(actrate_cell_b);
		actrate_cell.append(actrate_cell_h3);

		mxnget_row.append(mxnget_label).append(mxnget_cell);
		actrate_row.append(actrate_label).append(actrate_cell);
		cardTable.append(mxnget_row).append(actrate_row);
		card.append(cardName).append(cardTable);

		orderCard.push([mxnGet,card]);

		function sortFunction(a,b){
			if(a[0] === b[0]){
				return 0;
			}
			else{
				return(a[0] < b[0])? -1:1;
			}
		}

		orderCard.sort(sortFunction);
		

		var addcard = $("<div/>",{'class': "mix col-md-4 col-sm-4 col-xs-12 card addcard category-1"});

		container.mixItUp('insert',0, addcard, {filter: "all"});

		for(var i = 1; i <= orderCard.length; i++){
			container.mixItUp('insert',i ,orderCard[i-1][1], {filter: "all"});
		}

	}

	$(".addcard").click(function(){
		console.log("!!!!!!!");
		var id = index;

		var card = $("<div/>",{'class': "filimg mix col-md-4 col-sm-4 col-xs-12 card category-1", 'id':id+"_card"});
		var cardTable = $("<table/>",{'class':"card_table"});
		var name_row = $("<tr/>",{'class':"card_row"});
		var name_label = $("<td/>",{'class':"card_cell"}).text("Option Name");
		var name_cell = $("<td/>",{'class':"card_cell"});
		var name_input = $("<input/>",{'type':"text",'id':id+"_name"});
		name_cell.append(name_input);
		name_row.append(name_label).append(name_cell);

		var fee_row = $("<tr/>",{'class':"card_row"});
		var fee_label = $("<td/>",{'class':"card_cell"}).text("Transaction Fee");
		var fee_cell = $("<td/>",{'class':"card_cell"});
		var fee_input = $("<input/>",{'type':"text",'id':id+"_fee"});
		fee_cell.append(fee_input);
		fee_row.append(fee_label).append(fee_cell);

		var rate_row = $("<tr/>",{'class':"card_row"});
		var rate_label = $("<td/>",{'class':"card_cell"}).text("Exchange rate");
		var rate_cell = $("<td/>",{'class':"card_cell"});
		var rate_input = $("<input/>",{'type':"text",'id':id+"_rate"});
		rate_cell.append(rate_input);
		rate_row.append(rate_label).append(rate_cell)

		cardTable.append(name_row).append(fee_row).append(rate_row);

		var confirm_button = $("<button/>",{'id':index+"_confirm"}).text("Confirm").click(function(){
			confirmListener(id);
		});
		
		card.append(cardTable).append(confirm_button);
		$(this).remove();

		 $("#Container").mixItUp('insert',1,card, {filter: "all"});
		index++;
		
	});




	

	$("#search").click(function(){
		$('html,body').animate({scrollTop:$("#table").offset().top},800);
	})
});

