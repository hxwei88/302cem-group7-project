
//function display_history(result) {
//    $("#history_display").html('');
//    var html = '';
//    html+='<div class="accordian" id="accordion">';
//    result.forEach(function (item) {
//        var order = JSON.parse(item.orderDetail);
//        var cartTotal = 0;
//        
//        html+='<div class="card history-card">';
//        html+='<div class="card-header" id="heading'+item.id+'">';
//        html+=  '<h5 class="mb-0">';
//        html+=    '<button class="btn btn-link history-button" data-toggle="collapse" data-target="#collapse'+item.id+'" aria-expanded="false" aria-controls="collapse'+item.id+'">';
//        html+=      'Expand Order ID: #'+item.id+'';
//        html+=    '</button>';
//        html+=  '</h5>';
//        html+='</div>';
//        
//        html+= '<div id="collapse'+item.id+'" class="collapse" aria-labelledby="heading'+item.id+'" data-parent="#accordion">';
//        html+= '<div class="card-body">';
//        html +='<br><p><b>Order ID</b>: '+item.id+'';
//        html += '<b style="padding-left:20px;">User Id</b>: '+item.userid+"<br>"+
//                '<b>Username</b>: '+item.username+'<br>'+
//                '<b>Email Adress</b>: '+item.email+'<br>'+
//                '<b>Date (Y-M-D)</b>: '+item.date+"<br></p>"+
//                '<hr>';
//
//        var i = 0;
//        for(i = 0; i < order.length; i++){  
//            var totalprice = order[i].price * order[i].quantity;
//            html+='<b>'+order[i].name+'</b><br>'+ 
//                '<b>Quantity</b>: '+order[i].quantity+
//                '<span style="padding-left:20px"><b>Price Per Book</b>: RM'+order[i].price+'</span>'+
//                '<span style="padding-left:20px"><b>Total Price</b>: RM'+totalprice+'<br><hr>';
//            cartTotal = cartTotal + totalprice;
//        }
//    
//               html+='<b>Cart total price</b>: RM'+cartTotal;
//        html += '</div>';
//        html +='</div>';
//        html += '</div><br>';
//    });
//    html += '</div>';
//    html += '';
//    $("#history_display").append(html);
//}

function display_history(result) {
    $("#history_display").html('');
    var html = '';
    html+='<div class="accordian" id="accordion">';
    result.forEach(function (item) {
        var order = JSON.parse(item.orderDetail);
        var cartTotal = 0;
        
        html+='<div class="card history-card">';
        html+='<div class="card-header" id="heading'+item.id+'">';
        html+=  '<p class="mb-0">';
        html+=    '<b>Order ID: #'+item.id+'</b>';
        html+=  '</p>';
        html+='</div>';

        html+= '<div class="card-body">';
        html += '<b>User Id</b>: '+item.userid+"<br>"+
                '<b>Username</b>: '+item.username+'<br>'+
                '<b>Email Adress</b>: '+item.email+'<br>'+
                '<b>Adress</b>: '+item.address+'<br>'+
                '<b>Date & Time</b>: '+item.date+"<br></p>"+
                '<hr>';

        var i = 0;
        for(i = 0; i < order.length; i++){  
            var totalprice = order[i].price * order[i].quantity;
            html+='<b>'+order[i].name+'</b><br>'+ 
                '<b>Quantity</b>: '+order[i].quantity+
                '<span style="padding-left:20px"><b>Price Per Book</b>: RM'+order[i].price+'</span>'+
                '<span style="padding-left:20px"><b>Total Price</b>: RM'+totalprice+'<br><hr>';
            cartTotal = cartTotal + totalprice;
        }
    
        html+='<b>Cart total price</b>: RM'+cartTotal;
        html +='</div>';
        html += '</div><br>';
    });
    html += '</div>';
    html += '';
    $("#history_display").append(html);
}

function request_history_data(data) {
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/getHistory.php',
        success: function (result) {
            result = JSON.parse(result);
            console.log(result);
            display_history(result.result);
        }
    });
}
request_history_data();