
function display_history(result) {
    $("#stock_display").html('');
    var html = '';
    
    result.forEach(function (item, index, arr) {
        var order = JSON.parse(item.orderDetail);
        var cartTotal = 0;
        html += 'Order Id: '+item.id+"<br>";
        html += 'User Id: '+item.userid+"<br>";
        html += 'Date: '+item.date+"<br>";
//        alert(JSON.stringify(order));
        var i = 0;
        for(i = 0; i < order.length; i++){  
            var totalprice = order[i].price * order[i].quantity;
            html+='<b>'+order[i].name+'</b><br>'+ 
                'Quantity: '+order[i].quantity+'<br>'+
                'Price: '+order[i].price+'<br>'+
                'Total price: '+totalprice+'<br>';
            cartTotal = cartTotal + totalprice;
        }
        html += 'Cart total price: '+cartTotal;
        html += '<hr>';
    });

    html += '';
    $("#stock_display").append(html);
}

function request_history_data(data) {
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/getHistory.php',
//        data: data,
//        contentType: false,
//        cache: false,
//        processData: false,
        success: function (result) {
            result = JSON.parse(result);
            console.log(result);
            display_history(result.result);
        }
    });
}
request_history_data();